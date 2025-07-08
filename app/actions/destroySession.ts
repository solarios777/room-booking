'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function destroySession(): Promise<{ 
  error?: string; 
  success?: boolean 
}> {
  // Retrieve the session cookie - need to await cookies()
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite-session');

  if (!sessionCookie) {
    return {
      error: 'No session cookie found',
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);

    // Delete current session
    await account.deleteSession('current');

    // Clear session cookie
    cookieStore.delete('appwrite-session');

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: 'Error deleting session',
    };
  }
}

export default destroySession;