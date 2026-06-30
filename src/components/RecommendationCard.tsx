'use client';

import { Recommendation } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const [open, setOpen] = useState(false);
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
          <Link href={`/opportunities/${recommendation.id}`}>
  <Button variant="link" className="p-0 text-indigo-600 flex items-center">
    View Details
    <ArrowRight className="ml-1 h-3 w-3" />
  </Button>
</Link>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-xl">
    <DialogHeader>
      <DialogTitle>{recommendation.title}</DialogTitle>

      <DialogDescription>
        {recommendation.organization}
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span className="font-medium">Match Score</span>
        <Badge className="bg-indigo-600">
          {recommendation.matchScore}%
        </Badge>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Type</span>
        <span>{recommendation.type}</span>
      </div>

      {recommendation.deadline && (
        <div className="flex justify-between">
          <span className="font-medium">Deadline</span>
          <span>{recommendation.deadline}</span>
        </div>
      )}

      {recommendation.description && (
        <div>
          <p className="font-medium mb-2">
            Description
          </p>

          <p className="text-muted-foreground">
            {recommendation.description}
          </p>
        </div>
      )}

      {recommendation.skills && recommendation.skills.length > 0 && (
        <div>
          <p className="font-medium mb-2">
            Required Skills
          </p>

          <div className="flex flex-wrap gap-2">
            {recommendation.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

    </div>

    <DialogFooter>

      <Button
        className="bg-indigo-600 hover:bg-indigo-700"
        onClick={() => {
          if (recommendation.applyLink) {
            window.open(recommendation.applyLink, "_blank");
          }
        }}
      >
        Apply Now
      </Button>

    </DialogFooter>
  </DialogContent>
</Dialog>
    </motion.div>
  );
};
