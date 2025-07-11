'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';
import { revalidatePath } from 'next/cache';
import checkRoomAvailability from './checkRoomAvailability';

interface BookingResult {
  error?: string;
  success?: boolean;
}

async function bookRoom(previousState: any, formData: FormData): Promise<BookingResult> {
  const cookiesStore =await cookies();
  const sessionCookie = cookiesStore.get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    // Get user's ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to book a room',
      };
    }

    // Extract date and time from the formData
    const checkInDate = formData.get('check_in_date') as string;
    const checkInTime = formData.get('check_in_time') as string;
    const checkOutDate = formData.get('check_out_date') as string;
    const checkOutTime = formData.get('check_out_time') as string;
    const roomId = formData.get('room_id') as string;

    // Combine date and time to ISO 8601 format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    // Check if room is available
    const isAvailable = await checkRoomAvailability(
      roomId,
      checkInDateTime,
      checkOutDateTime
    );

    if (!isAvailable) {
      return {
        error: 'This room is already booked for the selected time',
      };
    }

    const bookingData = {
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
      user_id: user.id,
      room_id: roomId,
    };

    // Create booking
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS as string,
      ID.unique(),
      bookingData
    );

    // Revalidate cache
    revalidatePath('/bookings', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to book room', error);
    return {
      error: 'Something went wrong booking the room',
    };
  }
}

export default bookRoom;