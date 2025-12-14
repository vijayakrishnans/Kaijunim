'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Feed' },
  { href: '/explore', label: 'Explore' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/upload', label: 'Upload' },
  { href: '/messages', label: 'Messages' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
  { href: '/library', label: 'Library' },
  { href: '/open-source', label: 'Open Source' },
  { href: '/tools', label: 'Tools' }
];

export const Navigation = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-slate-950/80">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button className="sm:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="font-semibold text-lg">VidSocial</Link>
          <div className="hidden sm:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors',
                  pathname === link.href ? 'bg-slate-200 dark:bg-slate-800 font-semibold' : 'text-slate-700 dark:text-slate-200'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <button
          className="p-2 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle dark mode"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </nav>
      {open && (
        <div className="sm:hidden px-4 pb-3 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block text-sm px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800',
                pathname === link.href ? 'bg-slate-200 dark:bg-slate-800 font-semibold' : 'text-slate-700 dark:text-slate-200'
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
