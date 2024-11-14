import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user?: {
      id?: string;
      name?: string | null
      email?: string | null
      image?: string | null
      refresh_token?: string
    } & DefaultSession['user']
  }

  interface JWT {
    accessToken?: string;
  }
}