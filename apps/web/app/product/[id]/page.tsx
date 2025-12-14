"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function ProductDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({ queryKey: ['product', params.id], queryFn: () => api.getProductDetail(params.id) });

  if (isLoading) return <p>Loading product...</p>;
  if (!data) return <p>Product not found.</p>;

  const price = data.discount ? data.price * (1 - data.discount.percentage / 100) : data.price;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="text-sm text-slate-500">{data.category}</p>
        </div>
        <Badge>{data.type}</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>{data.description}</p>
        <div className="flex gap-3 text-sm text-slate-500">
          <span>Rating {data.metrics.rating.toFixed(1)} ({data.metrics.reviews} reviews)</span>
          <span>{data.metrics.sales} sales</span>
        </div>
        <div className="text-2xl font-semibold flex items-center gap-2">
          ${price.toFixed(2)}
          {data.discount && <Badge>-{data.discount.percentage}%</Badge>}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {data.gallery.map((img) => (
            <img key={img} src={img} alt={data.title} className="rounded-lg" />
          ))}
        </div>
        <Button>Purchase / Download</Button>
      </CardContent>
    </Card>
  );
}

export default function ProductDetailPage() {
  return <ProductDetail />;
}
