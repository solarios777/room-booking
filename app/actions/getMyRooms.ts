'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { Models } from 'node-appwrite';

type Room = Models.Document & {
  // Your room properties here
  user_id: string;
  name: string;
  description: string;
  address: string;
  availability: string;
  price_per_hour: number;
  sqft: number;
  image?: string;
  capacity: number;
  location: string;
  amenities: string;

  // Add other room properties as needed
};

async function getMyRooms(): Promise<Room[]> {
  try {
    // Properly get cookies - no await needed here as cookies() is synchronous
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get('appwrite-session');
    
    if (!sessionCookie?.value) {
      redirect('/login');
    }

    // Await the session client creation
    const { account, databases } = await createSessionClient(sessionCookie.value);

    // Get user info
    const user = await account.get();
    const userId = user.$id;

    // Fetch rooms
    const { documents: rooms } = await databases.listDocuments<Room>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
      [Query.equal('user_id', userId)]
    );

    return rooms;
  } catch (error) {
    console.error('Failed to get user rooms:', error);
    redirect('/error');
  }
}

export default getMyRooms;