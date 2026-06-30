'use client';

import { Opportunity } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Building2, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heart } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import Link from "next/link";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply?: (id: number) => void;
  applied?: boolean;
}
export const OpportunityCard = ({
  opportunity,
  onApply,
  applied = false,
}: OpportunityCardProps) => {
  const handleSave = async () => {
  try {
    await api.post(`/saved/${opportunity.id}`);

    toast.success("Opportunity saved successfully ❤️");
  } catch (error: any) {
    console.error(error);

    if (error.response?.status === 400) {
        toast.error("This opportunity is already in your saved list.");
    } else {
        toast.error("Unable to save the opportunity.");
    }
}
};
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
        <CardFooter className="pt-0 flex flex-col gap-2">

  <div className="flex gap-2 w-full">

    <Button
      variant="outline"
      onClick={handleSave}
      className="flex-1"
    >
      <Heart className="h-4 w-4 mr-2" />
      Save
    </Button>

    <Button
      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
      onClick={() => onApply?.(opportunity.id)}
    >
      Apply Now
    </Button>

  </div>

  <Link
    href={`/opportunities/${opportunity.id}`}
    className="text-indigo-600 hover:underline text-sm font-medium text-center"
  >
    View Details
  </Link>

</CardFooter>
      </Card>
    </motion.div>
  );  
};

