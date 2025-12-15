"use client";

import { useFeed } from '@/lib/use-feed';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

function FeedContent() {
  const { data, isLoading, isError } = useFeed();

  if (isLoading) return <p>Loading feed...</p>;
  if (isError || !data) return <p>Unable to load feed.</p>;
  if (data.items.length === 0) return <p>No feed items available.</p>;

  const stories = data.items.slice(0, Math.min(6, data.items.length));

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
        {stories.map((story) => (
          <div key={story.id} className="shrink-0 w-28 text-center space-y-2">
            <div className="h-40 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <Image src={story.mediaUrl} alt={story.caption ?? ''} fill className="object-cover" />
            </div>
            <p className="text-xs text-slate-500">{story.caption}</p>
          </div>
        ))}
      </div>
      {data.items.map((post) => (
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
              <Image src={post.mediaUrl} alt={post.caption ?? ''} fill className="object-cover" />
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>👍 {post.likes}</span>
              <span>💬 {post.comments}</span>
              <span className="capitalize">{post.author.name}</span>
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
