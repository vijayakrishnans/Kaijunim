"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
import Image from 'next/image';

function ExploreContent() {
  const { data, isLoading } = useQuery({ queryKey: ['explore'], queryFn: api.getExplore });
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (post) =>
        post.caption?.toLowerCase().includes(term.toLowerCase()) &&
        (location ? post.location?.toLowerCase().includes(location.toLowerCase()) : true)
    );
  }, [data, term, location]);

  if (isLoading) return <p>Loading explore...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Explore</h1>
          <p className="text-sm text-slate-500">Discover creators by topic and location.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />
          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{post.caption}</p>
                <p className="text-sm text-slate-500">{post.location}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src={post.url} alt={post.caption ?? ''} fill className="object-cover" />
              </div>
              <div className="text-sm text-slate-500 flex gap-3">
                <span>#{post.tags?.join(' #')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-slate-500">No posts match your filters.</p>}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return <ExploreContent />;
}
