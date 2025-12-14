import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ReactQueryProvider } from '@/lib/react-query-provider';
import { Navigation } from '@/components/navigation';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'VidSocial - Kaijunim',
  description: 'A digital marketplace and social platform for creators.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <Navigation />
            <main className="container-page">{children}</main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
