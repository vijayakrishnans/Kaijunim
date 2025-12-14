"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function ProfileContent() {
  const { data, isLoading } = useQuery({ queryKey: ['profile'], queryFn: () => api.getProfile('user-1') });

  if (isLoading || !data || !data.user) return <p>Loading profile...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <img src={data.user.avatar} alt={data.user.name} className="h-14 w-14 rounded-full" />
        <div>
          <h1 className="text-2xl font-semibold">{data.user.name}</h1>
          <p className="text-sm text-slate-500">@{data.user.handle}</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <p className="font-semibold">Featured products</p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-3">
          {data.products
            .filter((p) => p.featured)
            .map((p) => (
              <div key={p.id} className="border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-slate-500">{p.category}</p>
                  </div>
                  <Badge>Featured</Badge>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return <ProfileContent />;
}
