"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function MessagesPageContent() {
  const { data, isLoading } = useQuery({ queryKey: ['messages'], queryFn: api.getMessages });

  if (isLoading || !data) return <p>Loading messages...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <Button variant="outline">New conversation</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((conv) => (
          <Card key={conv.id}>
            <CardHeader className="flex items-center justify-between">
              <p className="font-semibold">Chat with {conv.participantIds.join(', ')}</p>
              <span className="text-sm text-slate-500">Unread {conv.unread}</span>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{conv.lastMessage}</p>
              <Button variant="ghost" asChild className="mt-2">
                <a href={`/chat/${conv.id}`}>Open</a>
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
