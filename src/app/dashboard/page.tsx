'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { DashboardStats } from '@/components/DashboardStats';
import { OpportunityCard } from '@/components/OpportunityCard';
import { RecommendationCard } from '@/components/RecommendationCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { useAuth } from '@/context/AuthContext';
import { Opportunity, Recommendation } from '@/types';
import api from '@/services/api';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oppsRes, recsRes] = await Promise.all([
          api.get('/opportunities?limit=3'),
          api.get('/recommendations?limit=2')
        ]);
        setOpportunities(oppsRes.data);
        setRecommendations(recsRes.data);
      } catch (error: any) {
        console.error('Error fetching dashboard data', error);
        setOpportunities([
          { id: 101, title: 'UX/UI Designer', organization: 'Adobe', type: 'Internship', deadline: '2026-07-15', applyLink: '#' }
        ]);
        setRecommendations([
          { id: 201, title: 'Junior Dev', organization: 'Netflix', matchScore: 92, type: 'Internship', deadline: '2026-08-20', applyLink: '#' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        <header>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            Welcome back, {user?.fullName || 'Student'} 👋
          </motion.h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your career goals today.
          </p>
        </header>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Opportunities</h2>
              <button className="text-sm text-indigo-600 hover:underline font-medium">View all</button>
            </div>
            
            {isLoading ? (
              <LoadingSkeleton type="card" />
            ) : opportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {opportunities.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No opportunities found" 
                description="We'll notify you when new opportunities match your profile." 
              />
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Top Recommendations</h2>
              <button className="text-sm text-indigo-600 hover:underline font-medium">Refine matches</button>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <div className="h-40 rounded-xl bg-card animate-pulse" />
                <div className="h-40 rounded-xl bg-card animate-pulse" />
              </div>
            ) : recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No recommendations yet" 
                description="Complete your profile to get personalized AI matched opportunities." 
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
