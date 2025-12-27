'use client';

import { useTutorial } from '@/lib/api/hooks';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function TutorialDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useTutorial(params?.id);
  const tutorial = data?.item;

  if (isLoading) return <p>Loading tutorial...</p>;
  if (isError) return <p className="text-red-500">Failed to load tutorial.</p>;
  if (!tutorial) return <p>Tutorial not found.</p>;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{tutorial.title}</h1>
          <p className="text-sm text-slate-500">{tutorial.category}</p>
        </div>
        <Badge className="capitalize">{tutorial.difficulty}</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-500">{tutorial.description}</p>
        <article className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: tutorial.contentMarkdown.replace(/\n/g, '<br />') }} />
        <div className="text-sm text-slate-500">Estimated time: {tutorial.estimatedMinutes} mins</div>
        <Button>Like</Button>
      </CardContent>
    </Card>
  );
}

export default function TutorialDetailPage() {
  return <TutorialDetail />;
}
