'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function UploadPage() {
  const [type, setType] = useState<'post' | 'story'>('post');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Uploaded ${type}`);
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Upload</h1>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Button type="button" variant={type === 'post' ? 'default' : 'outline'} onClick={() => setType('post')}>
              Post
            </Button>
            <Button type="button" variant={type === 'story' ? 'default' : 'outline'} onClick={() => setType('story')}>
              Story
            </Button>
          </div>
          <Input type="file" accept="image/*,video/*" required />
          <Textarea placeholder="Caption" />
          <Input placeholder="Tags" />
          <Input placeholder="Location" />
          <Button type="submit">Share</Button>
        </form>
      </CardContent>
    </Card>
  );
}
