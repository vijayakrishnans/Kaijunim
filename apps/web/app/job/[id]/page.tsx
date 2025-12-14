"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function JobDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({ queryKey: ['job', params.id], queryFn: api.getMarketplaceJobs });
  const job = data?.find((j) => j.id === params.id);

  if (isLoading) return <p>Loading job...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{job.title}</h1>
          <p className="text-sm text-slate-500">{job.category}</p>
        </div>
        <div className="text-sm text-slate-500 text-right">
          <p>{job.budget}</p>
          <p className="capitalize">{job.status}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>{job.description}</p>
        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
          {job.requirements.map((req) => (
            <span key={req} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800">
              {req}
            </span>
          ))}
        </div>
        <Button>Apply Now</Button>
      </CardContent>
    </Card>
  );
}

export default function JobDetailPage() {
  return <JobDetail />;
}
