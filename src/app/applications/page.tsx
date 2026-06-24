'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { ApplicationCard } from '@/components/ApplicationCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle, Info } from 'lucide-react';
import api from '@/services/api';
import { Application } from '@/types';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applications');
        setApplications(response.data);
      } catch (error: any) {
        console.error('Error fetching applications', error);
        setApplications([
          { id: 1, opportunityName: 'Software Engineering Intern @ Google', dateApplied: '2026-06-10', status: 'Applied' },
          { id: 2, opportunityName: 'Cybersecurity Scholarship @ Microsoft', dateApplied: '2026-06-15', status: 'Interview' },
          { id: 3, opportunityName: 'Data Science Hub @ Meta', dateApplied: '2026-06-18', status: 'Selected' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const stats = [
    { label: 'Applied', count: applications.filter(a => a.status === 'Applied').length, icon: Clock, color: 'text-blue-500' },
    { label: 'In Review', count: applications.filter(a => a.status === 'Interview').length, icon: Info, color: 'text-amber-500' },
    { label: 'Selected', count: applications.filter(a => a.status === 'Selected').length, icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Rejected', count: applications.filter(a => a.status === 'Rejected').length, icon: XCircle, color: 'text-red-500' },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Application Tracker</h1>
          <p className="text-muted-foreground mt-1">Keep track of your submissions and their current status.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {stats.map(stat => (
             <Card key={stat.label} className="glass-card">
               <CardContent className="p-6 flex flex-col items-center">
                 <stat.icon className={`h-8 w-8 ${stat.color} mb-2`} />
                 <span className="text-2xl font-bold">{stat.count}</span>
                 <span className="text-xs text-muted-foreground">{stat.label}</span>
               </CardContent>
             </Card>
           ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Active Applications</h2>
          
          {isLoading ? (
            <LoadingSkeleton type="table" />
          ) : applications.length > 0 ? (
            <div className="space-y-4">
              {/* Desktop View: Table */}
              <div className="hidden md:block rounded-xl border bg-card overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[300px]">Opportunity</TableHead>
                      <TableHead>Date Applied</TableHead>
                      <TableHead>Current Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">{app.opportunityName}</TableCell>
                        <TableCell>{app.dateApplied}</TableCell>
                        <TableCell>
                           <Badge 
                             variant="secondary" 
                             className={
                               app.status === 'Selected' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                               app.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                               app.status === 'Interview' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                               'bg-blue-500/10 text-blue-500 border-blue-500/20'
                             }
                           >
                            {app.status}
                           </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <button className="text-sm text-indigo-600 hover:underline">View details</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View: Cards */}
              <div className="md:hidden space-y-4">
                {applications.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState 
              title="No applications yet" 
              description="Start applying to opportunities to see them tracked here." 
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
