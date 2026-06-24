'use client';

import { Recommendation } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-l-4 border-l-indigo-500 overflow-hidden glass-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center mb-1">
            <Badge className="bg-indigo-500 text-white">
              <Zap className="h-3 w-3 mr-1 fill-current" />
              {recommendation.matchScore}% Match
            </Badge>
          </div>
          <CardTitle className="text-lg">{recommendation.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{recommendation.organization}</p>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span>Matching skills</span>
              <span>{recommendation.matchScore}%</span>
            </div>
            <Progress value={recommendation.matchScore} className="h-1.5" />
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 pt-4 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{recommendation.type}</span>
          <Button variant="link" className="p-0 text-indigo-600 flex items-center">
            View details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
