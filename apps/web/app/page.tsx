"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

function FeedContent() {
  const { data, isLoading } = useQuery({ queryKey: ['feed'], queryFn: api.getFeed });

  if (isLoading || !data) return <p>Loading feed...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Feed</h1>
        <div className="flex gap-2 text-sm">
          <Badge>For You</Badge>
          <Badge variant="outline">Following</Badge>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {data.stories.map((story) => (
          <div key={story.id} className="shrink-0 w-28 text-center space-y-2">
            <div className="h-40 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <Image src={story.url} alt={story.caption ?? ''} fill className="object-cover" />
            </div>
            <p className="text-xs text-slate-500">{story.caption}</p>
          </div>
        ))}
      </div>
      {data.posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{post.caption}</p>
              <p className="text-sm text-slate-500">{post.location}</p>
            </div>
            <div className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleString()}</div>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src={post.url} alt={post.caption ?? ''} fill className="object-cover" />
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>👍 {post.likes}</span>
              <span>💬 {post.comments}</span>
              <span className="capitalize">{post.type}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Page() {
  return <FeedContent />;
}
