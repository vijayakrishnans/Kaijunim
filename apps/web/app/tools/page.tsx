"use client";

import { api } from '@/lib/mock-client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ToolsContent() {
  const { data, isLoading } = useQuery({ queryKey: ['tools'], queryFn: api.getTools });

  if (isLoading || !data) return <p>Loading tools...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Creator Tools</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((tool) => (
          <Card key={tool.id}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{tool.name}</p>
                <p className="text-sm text-slate-500">{tool.category}</p>
              </div>
              {tool.free ? <Badge>Free</Badge> : <Badge variant="outline">Paid</Badge>}
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-slate-500">{tool.description}</p>
              <div className="flex gap-2">
                <Button asChild size="sm">
                  <a href={tool.toolUrl}>Visit</a>
                </Button>
                {tool.affiliateLink && (
                  <Button asChild size="sm" variant="outline">
                    <a href={tool.affiliateLink}>Affiliate</a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return <ToolsContent />;
}
