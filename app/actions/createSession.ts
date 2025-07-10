// createSession.ts
'use server';
import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

type AuthState = {
  error?: string;
  success?: boolean;
};

async function createSession(
  previousState: AuthState, 
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  

  if (!email || !password) {
    return { error: 'Please fill out all fields', success: false };
  }

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expire),
      path: '/',
    });

    return { success: true, error: undefined };
  } catch (error) {
    console.log('Authentication Error: ', error);
    return { error: 'Invalid Credentials', success: false };
  }
}

export default createSession;