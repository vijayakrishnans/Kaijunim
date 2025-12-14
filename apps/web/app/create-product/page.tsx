'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function CreateProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted product ${title} at $${price} with discount ${discount || 'none'}`);
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">List a product</h1>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Description" required />
          <div className="grid md:grid-cols-2 gap-3">
            <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <Input type="number" placeholder="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Select defaultValue="digital">
              <option value="digital">Digital</option>
              <option value="physical">Physical</option>
              <option value="service">Service</option>
            </Select>
            <Select defaultValue="art">
              <option value="art">Art</option>
              <option value="music">Music</option>
              <option value="software">Software</option>
            </Select>
          </div>
          <Input type="file" multiple />
          <Button type="submit">Publish</Button>
        </form>
      </CardContent>
    </Card>
  );
}
