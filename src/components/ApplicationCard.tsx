'use client';

import { Application } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApplicationCardProps {
  application: Application;
}

const statusColors = {
  Saved: 'bg-slate-500/10 text-slate-500',
  Applied: 'bg-blue-500/10 text-blue-500',
  Interview: 'bg-amber-500/10 text-amber-500',
  Selected: 'bg-green-500/10 text-green-500',
  Rejected: 'bg-red-500/10 text-red-500',
};

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{application.opportunityName}</h4>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Applied on {application.dateApplied}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className={statusColors[application.status]} variant="secondary">
              {application.status}
            </Badge>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
