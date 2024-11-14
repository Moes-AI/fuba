'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-6">
          <Building2 className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold text-center">Sign in to Realtor AI Assistant</h1>
          <p className="text-muted-foreground text-center">
            Connect your Google account to access all features
          </p>
          <Button
            size="lg"
            className="w-full"
            onClick={() => signIn('google', { 
              callbackUrl: '/settings',
              redirect: true
            })}
          >
            Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}