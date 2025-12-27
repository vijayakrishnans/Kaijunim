'use client';

import { useProduct } from '@/lib/api/hooks';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function ProductDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProduct(params?.id);
  const product = data?.item;

  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p className="text-red-500">Failed to load product.</p>;
  if (!product) return <p>Product not found.</p>;

  const price = product.discount ? product.price * (1 - product.discount.percent / 100) : product.price;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-sm text-slate-500">{product.category}</p>
        </div>
        <Badge>{product.type}</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>{product.description}</p>
        <div className="flex gap-3 text-sm text-slate-500">
          <span>Rating {product.metrics.rating.toFixed(1)} ({product.metrics.reviewsCount} reviews)</span>
          <span>{product.metrics.sales} sales</span>
        </div>
        <div className="text-2xl font-semibold flex items-center gap-2">
          ${price.toFixed(2)}
          {product.discount && <Badge>-{product.discount.percent}%</Badge>}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[product.previewUrl, product.previewUrl].map((img, index) => (
            <img key={`${img}-${index}`} src={img} alt={product.title} className="rounded-lg" />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
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
