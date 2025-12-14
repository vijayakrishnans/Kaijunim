"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function DashboardContent() {
  const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: () => api.getDashboard('user-1') });

  if (isLoading || !data) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Creator Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {data.analytics.map((row) => (
          <Card key={row.id}>
            <CardHeader>
              <p className="font-semibold">{row.date}</p>
            </CardHeader>
            <CardContent className="text-sm text-slate-500 space-y-1">
              <p>Views: {row.views}</p>
              <p>Likes: {row.likes}</p>
              <p>Comments: {row.comments}</p>
              <p>Revenue: ${row.revenue.toFixed(2)}</p>
              <p>Engagement: {(row.engagementRate * 100).toFixed(1)}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
