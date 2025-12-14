'use client';

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function ChatDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({ queryKey: ['chat', params.id], queryFn: () => api.getChat(params.id) });
  const [message, setMessage] = useState('');

  if (isLoading || !data) return <p>Loading chat...</p>;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent: ${message}`);
    setMessage('');
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Conversation {params.id}</h1>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {data.map((msg) => (
            <div key={msg.id} className="text-sm">
              <span className="font-semibold mr-2">{msg.senderId}</span>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={handleSend}>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" required />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ChatPage() {
  return <ChatDetail />;
}
