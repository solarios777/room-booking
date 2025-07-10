'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Models } from 'node-appwrite';

interface Room extends Models.Document {
  $id: string;
  user_id: string;
  // Add other room properties as needed
}

interface DeleteRoomResult {
  success?: boolean;
  error?: string;
}

async function deleteRoom(roomId: string): Promise<DeleteRoomResult> {
  const cookiesStore =await cookies();
  const sessionCookie = cookiesStore.get('appwrite-session');
  
  if (!sessionCookie?.value) {
    redirect('/login');
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );

    // Get user's ID
    const user = await account.get();
    const userId = user.$id;

    // Fetch user's rooms
    const { documents: rooms } = await databases.listDocuments<Room>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
      [Query.equal('user_id', userId)]
    );

    // Find room to delete
    const roomToDelete = rooms.find((room) => room.$id === roomId);

    // Delete the room if found
    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
        roomToDelete.$id
      );

      // Revalidate paths
      revalidatePath('/rooms/my', 'layout');
      revalidatePath('/', 'layout');

      return { success: true };
    }

    return { error: 'Room not found' };
  } catch (error) {
    console.error('Failed to delete room:', error);
    return { error: 'Failed to delete room' };
  }
}

export default deleteRoom;