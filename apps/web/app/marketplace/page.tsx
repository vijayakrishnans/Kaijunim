"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

function ProductsTab() {
  const { data, isLoading } = useQuery({ queryKey: ['products'], queryFn: api.getMarketplaceProducts });
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('recent');

  const filtered = useMemo(() => {
    if (!data) return [];
    return data
      .filter((p) => p.title.toLowerCase().includes(term.toLowerCase()) || p.description.toLowerCase().includes(term.toLowerCase()))
      .filter((p) => (category === 'all' ? true : p.category === category))
      .filter((p) => (minPrice ? p.price >= Number(minPrice) : true))
      .filter((p) => (maxPrice ? p.price <= Number(maxPrice) : true))
      .sort((a, b) => {
        switch (sort) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.metrics.rating - a.metrics.rating;
          case 'popular':
            return b.metrics.sales - a.metrics.sales;
          default:
            return b.id.localeCompare(a.id);
        }
      });
  }, [data, term, category, minPrice, maxPrice, sort]);

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-3">
        <Input placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {['art', 'novels', 'movies', 'games', 'music', 'software', 'photography'].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        <Input placeholder="Min price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <Input placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="recent">Most recent</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Highest rated</option>
          <option value="popular">Most popular</option>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <Button asChild>
          <a href="/create-product">List Product</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/open-source">Support OSS</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/tools">Tools</a>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((product) => (
          <Card key={product.id}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{product.title}</p>
                <p className="text-sm text-slate-500">{product.category}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold">${product.price.toFixed(2)}</p>
                {product.discount && (
                  <p className="text-emerald-500">-{product.discount.percentage}%</p>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{product.description}</p>
              <div className="flex gap-3 text-sm text-slate-500">
                <span>Rating {product.metrics.rating.toFixed(1)}</span>
                <span>{product.metrics.sales} sales</span>
              </div>
              <Button variant="ghost" asChild className="mt-2">
                <a href={`/product/${product.id}`}>View</a>
              </Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-slate-500">No products match your filters.</p>}
      </div>
    </div>
  );
}

function JobsTab() {
  const { data, isLoading } = useQuery({ queryKey: ['marketplace-jobs'], queryFn: api.getMarketplaceJobs });
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('recent');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    if (!data) return [];
    return data
      .filter((j) => j.title.toLowerCase().includes(term.toLowerCase()) || j.description.toLowerCase().includes(term.toLowerCase()))
      .filter((j) => (category === 'all' ? true : j.category === category))
      .filter((j) => (status === 'all' ? true : j.status === status))
      .sort((a, b) => {
        switch (sort) {
          case 'budget-asc':
            return parseFloat(a.budget.slice(1)) - parseFloat(b.budget.slice(1));
          case 'budget-desc':
            return parseFloat(b.budget.slice(1)) - parseFloat(a.budget.slice(1));
          default:
            return b.id.localeCompare(a.id);
        }
      });
  }, [data, term, category, sort, status]);

  if (isLoading) return <p>Loading jobs...</p>;

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-3">
        <Input placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {['translator', 'artist', 'game developer', 'designer', 'composer', 'developer'].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Any status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </Select>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="recent">Most recent</option>
          <option value="budget-asc">Budget: low to high</option>
          <option value="budget-desc">Budget: high to low</option>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <Button asChild>
          <a href="/post-job">Post Job</a>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((job) => (
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
                <span>{job.applications} applications</span>
              </div>
              <Button variant="ghost" asChild className="mt-2">
                <a href={`/job/${job.id}`}>View</a>
              </Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-slate-500">No jobs match your filters.</p>}
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Marketplace</h1>
      </div>
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="jobs">
          <JobsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
