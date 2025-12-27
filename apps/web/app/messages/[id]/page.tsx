'use client';

import { useMessages, useSendMessage } from '@/lib/api/hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function ChatDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useMessages(params?.id);
  const sendMessage = useSendMessage();
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!params?.id || !message.trim()) return;
    sendMessage.mutate({ conversationId: params.id, body: message });
    setMessage('');
  };

  if (isLoading) return <p>Loading chat...</p>;
  if (isError) return <p className="text-red-500">Failed to load chat.</p>;
  if (!data?.items?.length) return <p>No messages yet.</p>;

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Conversation {params.id}</h1>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {data.items.map((msg) => (
            <div key={msg.id} className="text-sm">
              <span className="font-semibold mr-2">{msg.sender.name}</span>
              <span>{msg.body}</span>
              <span className="ml-2 text-xs text-slate-500">{msg.status}</span>
            </div>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={handleSend}>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" required />
          <Button type="submit" disabled={sendMessage.isPending}>
            {sendMessage.isPending ? 'Sending...' : 'Send'}
          </Button>
        </form>
        {sendMessage.isError && <p className="text-xs text-red-500">Failed to send message.</p>}
      </CardContent>
    </Card>
  );
}

export default function ChatPage() {
  return <ChatDetail />;
}
