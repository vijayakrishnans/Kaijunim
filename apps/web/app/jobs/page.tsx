"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function JobsPageContent() {
  const { data, isLoading } = useQuery({ queryKey: ['jobs'], queryFn: api.getMarketplaceJobs });

  if (isLoading || !data) return <p>Loading jobs...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Jobs</h1>
          <p className="text-sm text-slate-500">Find freelance gigs tailored to creators.</p>
        </div>
        <Button asChild>
          <a href="/post-job">Post Job</a>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((job) => (
          <Card key={job.id}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-slate-500">{job.category}</p>
              </div>
              <div className="text-sm text-slate-500 text-right">
                <p>{job.budget}</p>
                <p className="capitalize">{job.status}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{job.description}</p>
              <div className="flex gap-3 text-sm text-slate-500">
                <span>{job.duration}</span>
                <span>{job.applications} applicants</span>
              </div>
              <Button variant="ghost" asChild className="mt-2">
                <a href={`/job/${job.id}`}>View details</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return <JobsPageContent />;
}
