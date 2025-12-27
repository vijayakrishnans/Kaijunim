'use client';

import { useConversations } from '@/lib/api/hooks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function MessagesPageContent() {
  const { data, isLoading, isError } = useConversations();

  if (isLoading) return <p>Loading messages...</p>;
  if (isError) return <p className="text-red-500">Failed to load conversations.</p>;
  if (!data?.items?.length) return <p>No conversations yet.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <Button variant="outline">New conversation</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {data.items.map((conv) => (
          <Card key={conv.id}>
            <CardHeader className="flex items-center justify-between">
              <p className="font-semibold">Chat with {conv.participants.map((p) => p.name).join(', ')}</p>
              <span className="text-sm text-slate-500">Unread {conv.unreadCount}</span>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{conv.lastMessagePreview}</p>
              <Button variant="ghost" asChild className="mt-2">
                <Link href={`/messages/${conv.id}`}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return <MessagesPageContent />;
}
