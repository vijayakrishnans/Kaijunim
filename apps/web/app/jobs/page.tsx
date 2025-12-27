'use client';

import { useJobs } from '@/lib/api/hooks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function JobsPageContent() {
  const { data, isLoading, isError } = useJobs();

  if (isLoading) return <p>Loading jobs...</p>;
  if (isError) return <p className="text-red-500">Failed to load jobs.</p>;
  if (!data?.items?.length) return <p>No jobs yet.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Jobs</h1>
          <p className="text-sm text-slate-500">Find freelance gigs tailored to creators.</p>
        </div>
        <Button asChild>
          <Link href="/post-job">Post Job</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {data.items.map((job) => (
          <Card key={job.id}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-slate-500">{job.category}</p>
              </div>
              <div className="text-sm text-slate-500 text-right">
                <p>
                  ${job.budgetMin} - ${job.budgetMax}
                </p>
                <p className="capitalize">{job.status}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{job.description}</p>
              <div className="flex gap-3 text-sm text-slate-500">
                <span>{job.duration}</span>
                <span>{job.applicationsCount} applicants</span>
              </div>
              <Button variant="ghost" asChild className="mt-2">
                <Link href={`/jobs/${job.id}`}>View details</Link>
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
