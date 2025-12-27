'use client';

import { useTutorials } from '@/lib/api/hooks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import Link from 'next/link';

function TutorialsContent() {
  const { data, isLoading, isError } = useTutorials();
  const [term, setTerm] = useState('');
  const [difficulty, setDifficulty] = useState('all');

  const filtered = useMemo(() => {
    if (!data?.items) return [];
    return data.items
      .filter((t) => t.title.toLowerCase().includes(term.toLowerCase()) || t.description.toLowerCase().includes(term.toLowerCase()))
      .filter((t) => (difficulty === 'all' ? true : t.difficulty === difficulty));
  }, [data, term, difficulty]);

  if (isLoading) return <p>Loading tutorials...</p>;
  if (isError) return <p className="text-red-500">Failed to load tutorials.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Tutorials</h1>
          <p className="text-sm text-slate-500">Guides with markdown support.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="all">Any difficulty</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
        </div>
        <Button asChild>
          <Link href="/create-tutorial">Create Tutorial</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((tutorial) => (
          <Card key={tutorial.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{tutorial.title}</p>
                  <p className="text-sm text-slate-500">{tutorial.category}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 capitalize">{tutorial.difficulty}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{tutorial.description}</p>
              <div className="text-sm text-slate-500">Views {tutorial.views}</div>
              <Button variant="ghost" asChild className="mt-2">
                <Link href={`/tutorials/${tutorial.id}`}>Read</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-slate-500">No tutorials found.</p>}
      </div>
    </div>
  );
}

export default function TutorialsPage() {
  return <TutorialsContent />;
}
