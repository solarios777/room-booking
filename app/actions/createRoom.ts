'use server';
import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

interface FormState {
  error?: string;
  success?: boolean;
}

interface RoomData {
  user_id: string;
  name: string;
  description: string;
  sqft: string;
  capacity: string;
  location: string;
  address: string;
  availability: string;
  price_per_hour: string;
  amenities: string;
  image?: string;
}


async function createRoom(previousState: FormState, formData: FormData): Promise<FormState> {
  // Get databases instance
  const { databases, storage } = await createAdminClient();
  console.log((await checkAuth()).user);

  try {
    const {user}  = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to create a room',
      };
    }

    // Uploading image
    let imageID: string | undefined;

    // storage bucket
    const bucketId: any = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;

    const image = formData.get('image') as File | null;

    if (image && image.size > 0 && image.name !== 'undefined') {
      try {
        // Upload
        const response = await storage.createFile(bucketId, ID.unique(), image);
        imageID = response.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'Error uploading image',
        };
      }
    } else {
      console.log('No image file provided or file is invalid');
    }

    // Create room
    const roomData: RoomData = {
      user_id: user.id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      sqft: formData.get('sqft') as string,
      capacity: formData.get('capacity') as string,
      location: formData.get('location') as string,
      address: formData.get('address') as string,
      availability: formData.get('availability') as string,
      price_per_hour: formData.get('price_per_hour') as string,
      amenities: formData.get('amenities') as string,
    };

    if (imageID) {
      roomData.image = imageID;
    }

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
      ID.unique(),
      roomData
    );

    revalidatePath('/', 'layout');

    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error.response?.message || 'An unexpected error has occurred';
    return {
      error: errorMessage,
    };
  }
}

export default createRoom; 