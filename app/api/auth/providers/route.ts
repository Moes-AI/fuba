import { NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/route';

export async function GET() {
  return NextResponse.json({
    google: {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      signinUrl: '/api/auth/signin/google',
      callbackUrl: '/api/auth/callback/google',
    },
  });
}