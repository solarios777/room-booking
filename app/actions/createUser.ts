'use server';
import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';

interface FormState {
  error?: string;
  success?: boolean;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function createUser(
  previousState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  // Extract form data with proper typing
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  // Validate inputs
  if (!email || !name || !password) {
    return {
      error: 'Please fill in all fields',
    };
  }

  if (password.length < 8) {
    return {
      error: 'Password must be at least 8 characters long',
    };
  }

  if (password !== confirmPassword) {
    return {
      error: 'Passwords do not match',
    };
  }

  // Get account instance
  const { account } = await createAdminClient();

  try {
    // Create user with proper typing
    await account.create(ID.unique(), email, password, name);
    
    return {
      success: true,
    };
  } catch (error) {
    console.error('Registration Error:', error);
    
    // Handle specific error cases if needed
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Could not register user';
    
    return {
      error: errorMessage,
    };
  }
}