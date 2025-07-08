'use server';

import { createAdminClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

async function getAllRooms(): Promise<any[]> { // Consider replacing 'any' with a proper Room type
  try {
    const { databases } = await createAdminClient();

    // Fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!
    );

    

    return rooms;
  } catch (error) {
    console.log('Failed to get rooms', error);
    redirect('/error');
  }
}

export default getAllRooms;