'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Zap, CheckCircle, TrendingUp } from 'lucide-react';

export const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Opportunities',
      value: '124',
      icon: Briefcase,
      trend: '+12% this week',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Recommendations',
      value: '18',
      icon: Zap,
      trend: '4 new today',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Applications',
      value: '6',
      icon: CheckCircle,
      trend: '2 pending',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Success Rate',
      value: '84%',
      icon: TrendingUp,
      trend: '+5% increase',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <Card key={i} className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">{stat.trend.split(' ')[0]}</span>
              {' ' + stat.trend.split(' ').slice(1).join(' ')}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
