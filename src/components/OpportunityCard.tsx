'use client';

import { Opportunity } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Building2, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply?: (id: number) => void;
}

export const OpportunityCard = ({ opportunity, onApply }: OpportunityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20">
              {opportunity.type}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {opportunity.deadline}
            </div>
          </div>
          <CardTitle className="line-clamp-1">{opportunity.title}</CardTitle>
          <CardDescription className="flex items-center">
            <Building2 className="h-3 w-3 mr-1" />
            {opportunity.organization}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {opportunity.description || 'No description provided for this opportunity.'}
          </p>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
            onClick={() => onApply?.(opportunity.id)}
          >
            Apply Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
