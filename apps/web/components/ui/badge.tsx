import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
      variant === 'outline'
        ? 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-100'
        : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
      className
    )}
    {...props}
  />
);
