'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const LoadingSkeleton = ({ type }: { type: 'card' | 'table' | 'profile' }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[280px] rounded-xl bg-card border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 rounded-lg bg-card border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="h-40 rounded-xl bg-card border border-border animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-60 rounded-xl bg-card border border-border animate-pulse" />
        <div className="h-60 rounded-xl bg-card border border-border animate-pulse" />
      </div>
    </div>
  );
};
