'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

const settingsSchema = z.object({
  fubApiKey: z.string().min(1, 'FollowUpBoss API Key is required'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fubApiKey: '',
    },
  });

  useEffect(() => {
    async function loadSettings() {
      if (session?.user?.email) {
        const { data, error } = await supabase
          .from('user_settings')
          .select('fub_api_key')
          .eq('email', session.user.email)
          .single();

        if (data) {
          form.setValue('fubApiKey', data.fub_api_key);
        }
        setIsLoading(false);
      }
    }

    loadSettings();
  }, [session, form]);

  useEffect(() => {
    if (session?.accessToken) {
      supabase.auth.setSession({
        access_token: session.accessToken as string,
        refresh_token: session.user.refresh_token as string,
      });
    }
  }, [session]);

  async function onSubmit(data: SettingsFormValues) {
    if (!session?.user?.email) return;

    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          email: session.user.email,
          fub_api_key: data.fubApiKey,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;

      toast({
        title: 'Settings saved',
        description: 'Your settings have been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded"></div>
          <div className="h-[400px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fubApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FollowUpBoss API Key</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your API key"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your FollowUpBoss API key is required to sync contacts and
                      send messages.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Settings</Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}