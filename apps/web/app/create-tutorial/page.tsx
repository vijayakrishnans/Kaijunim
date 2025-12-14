'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function CreateTutorialPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tutorial ${title} submitted with ${content.length} chars`);
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Create tutorial</h1>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Short description" required />
          <Textarea placeholder="Markdown content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} required />
          <div className="grid md:grid-cols-2 gap-3">
            <Select defaultValue="beginner">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
            <Select defaultValue="video">
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="design">Design</option>
            </Select>
          </div>
          <Input type="file" />
          <Button type="submit">Publish</Button>
        </form>
      </CardContent>
    </Card>
  );
}
