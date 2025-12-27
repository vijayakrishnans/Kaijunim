'use client';

import { useProfile, useProducts } from '@/lib/api/hooks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';

function ProfileContent() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProfile(params?.id);
  const { data: productsData } = useProducts();

  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p className="text-red-500">Failed to load profile.</p>;
  if (!data?.item) return <p>Profile not found.</p>;

  const featuredProducts = productsData?.items.filter((product) =>
    data.item.featuredProductIds.includes(product.id)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <img src={data.item.avatarUrl} alt={data.item.name} className="h-14 w-14 rounded-full" />
        <div>
          <h1 className="text-2xl font-semibold">{data.item.name}</h1>
          <p className="text-sm text-slate-500">{data.item.bio}</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <p className="font-semibold">Featured products</p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-3">
          {featuredProducts?.map((p) => (
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
          {!featuredProducts?.length && <p className="text-sm text-slate-500">No featured products yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return <ProfileContent />;
}
