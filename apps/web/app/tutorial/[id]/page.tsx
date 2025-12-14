"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function TutorialDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({ queryKey: ['tutorial', params.id], queryFn: () => api.getTutorialDetail(params.id) });

  if (isLoading) return <p>Loading tutorial...</p>;
  if (!data) return <p>Tutorial not found.</p>;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="text-sm text-slate-500">{data.category}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 capitalize">{data.difficulty}</span>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-500">{data.description}</p>
        <article className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, '<br />') }} />
        <div className="text-sm text-slate-500">Estimated time: {data.estimatedTime}</div>
        <Button>Like</Button>
      </CardContent>
    </Card>
  );
}

export default function TutorialDetailPage() {
  return <TutorialDetail />;
}
