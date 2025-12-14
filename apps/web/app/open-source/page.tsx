"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function OpenSourcePageContent() {
  const { data, isLoading } = useQuery({ queryKey: ['open-source'], queryFn: api.getOpenSource });

  if (isLoading || !data) return <p>Loading open-source projects...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Open Source</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{project.name}</p>
                <p className="text-sm text-slate-500">{project.category}</p>
              </div>
              <span className="text-sm text-slate-500">{project.supporters} supporters</span>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-slate-500">{project.description}</p>
              <div className="flex gap-2">
                <Button asChild size="sm">
                  <a href={project.projectUrl}>Project</a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={project.githubUrl}>GitHub</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function OpenSourcePage() {
  return <OpenSourcePageContent />;
}
