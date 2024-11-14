import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to Realtor AI Assistant
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your intelligent real estate assistant that helps you manage contacts and
          automate communications through FollowUpBoss integration.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Users className="h-12 w-12 text-primary" />
            <h2 className="text-2xl font-semibold">Contact Management</h2>
            <p className="text-muted-foreground">
              Efficiently manage and organize your real estate contacts in one
              place.
            </p>
            <Link href="/contacts">
              <Button>View Contacts</Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <MessageSquare className="h-12 w-12 text-primary" />
            <h2 className="text-2xl font-semibold">Smart Messaging</h2>
            <p className="text-muted-foreground">
              Schedule and send personalized messages to your contacts
              automatically.
            </p>
            <Link href="/messages">
              <Button>Manage Messages</Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Building2 className="h-12 w-12 text-primary" />
            <h2 className="text-2xl font-semibold">FollowUpBoss Integration</h2>
            <p className="text-muted-foreground">
              Seamlessly integrate with your FollowUpBoss account to sync data.
            </p>
            <Link href="/settings">
              <Button>Configure Settings</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}