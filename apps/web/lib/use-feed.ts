'use client';

import { useQuery } from '@tanstack/react-query';

export type Author = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

export type FeedItem = {
  id: string;
  author: Author;
  caption: string;
  location: string;
  mediaUrl: string;
  likes: number;
  comments: number;
  createdAt: string;
};

export type FeedResponse = {
  items: FeedItem[];
  nextCursor: string | null;
};

async function fetchFeed(): Promise<FeedResponse> {
  const response = await fetch('/api/v1/feed');

  if (!response.ok) {
    throw new Error('Failed to load feed');
  }

  return response.json();
}

export function useFeed() {
  return useQuery<FeedResponse>({ queryKey: ['feed'], queryFn: fetchFeed });
}
