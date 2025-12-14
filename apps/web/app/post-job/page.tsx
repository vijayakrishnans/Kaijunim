'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

export default function PostJobPage() {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Job ${title} posted`);
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Post a job</h1>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Description" required />
          <div className="grid md:grid-cols-2 gap-3">
            <Input placeholder="Budget range" required />
            <Input placeholder="Duration" required />
          </div>
          <Select defaultValue="artist">
            <option value="artist">Artist</option>
            <option value="developer">Developer</option>
            <option value="translator">Translator</option>
          </Select>
          <Input placeholder="Tags" />
          <Button type="submit">Publish job</Button>
        </form>
      </CardContent>
    </Card>
  );
}
