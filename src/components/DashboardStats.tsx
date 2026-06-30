'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Zap, CheckCircle, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalOpportunities: number;
    totalRecommendations: number;
    totalApplications: number;
    profileStrength: number;
  };
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const dashboardStats = [
    {
      title: 'Total Opportunities',
      value: stats.totalOpportunities,
      icon: Briefcase,
      trend: 'Live from database',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Recommendations',
      value: stats.totalRecommendations,
      icon: Zap,
      trend: 'AI matched',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Applications',
      value: stats.totalApplications,
      icon: CheckCircle,
      trend: 'Submitted',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Profile Strength',
      value: `${stats.profileStrength}%`,
      icon: TrendingUp,
      trend: 'Complete your profile',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {dashboardStats.map((stat, i) => (
        <Card key={i} className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>

            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>

            <p className="text-xs text-muted-foreground mt-1">
              {stat.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};