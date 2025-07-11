'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';

interface AppwriteDocument {
  $id: string;
  $collectionId?: string;
  $databaseId?: string;
  $createdAt?: string;
  $updatedAt?: string;
  $permissions?: string[];
  [key: string]: any;
}

interface Booking extends AppwriteDocument {
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
  // Add other booking-specific fields here
}

type GetMyBookingsResult = Booking[] | { error: string };

function transformToBooking(doc: AppwriteDocument): Booking {
  return {
    ...doc,
    // Explicitly map all required fields
    $id: doc.$id,
    user_id: doc.user_id,
    room_id: doc.room_id,
    check_in: doc.check_in,
    check_out: doc.check_out,
    // Add any additional transformations if needed
  };
}

async function getMyBookings(): Promise<GetMyBookingsResult> {
  const cookiesStore =await cookies();
  const sessionCookie = cookiesStore.get('appwrite-session');
  
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    // Get user's ID with proper typing
    const { user } = await checkAuth();
    if (!user?.id) {
      return { error: 'You must be logged in to view bookings' };
    }

    // Fetch user's bookings with proper typing
    const { documents } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS as string,
      [Query.equal('user_id', user.id)]
    );

    // Transform and validate the documents
    const bookings = documents.map(transformToBooking);
    return bookings;

  } catch (error) {
    console.error('Failed to get user bookings:', error);
    return { error: 'Failed to get bookings. Please try again later.' };
  }
}

export default getMyBookings;