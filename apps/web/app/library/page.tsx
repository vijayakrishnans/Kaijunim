"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function LibraryContent() {
  const { data, isLoading } = useQuery({ queryKey: ['library'], queryFn: () => api.getLibrary('user-1') });

  if (isLoading || !data) return <p>Loading library...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Library</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((purchase) => (
          <Card key={purchase.id}>
            <CardHeader>
              <p className="font-semibold">{purchase.productId}</p>
              <p className="text-sm text-slate-500">Purchased ${purchase.price.toFixed(2)}</p>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Download</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return <LibraryContent />;
}
