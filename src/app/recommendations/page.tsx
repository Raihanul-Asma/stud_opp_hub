'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { RecommendationCard } from '@/components/RecommendationCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BrainCircuit } from 'lucide-react';
import api from '@/services/api';
import { Recommendation } from '@/types';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get('/recommendations');
        // Sort by highest match score as requested
        const sorted = response.data.sort((a: Recommendation, b: Recommendation) => b.matchScore - a.matchScore);
        setRecommendations(sorted);
      } catch (error: any) {
        console.error('Error fetching recommendations', error);
        const mockRecs: Recommendation[] = [
          {
            id: 1,
            title: 'Full Stack Engineer',
            organization: 'Amazon',
            matchScore: 94,
            type: 'Internship',
            deadline: '2026-08-15',
            applyLink: '#',
          },
          {
            id: 2,
            title: 'Cloud Architect Intern',
            organization: 'AWS',
            matchScore: 88,
            type: 'Internship',
            deadline: '2026-09-01',
            applyLink: '#',
          }
        ];
        setRecommendations(mockRecs);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">Personalized for You</h1>
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 py-1">
                <Sparkles className="h-3 w-3 mr-1 fill-current" />
                AI Powered
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Based on your skills, interests, and academic performance.</p>
          </div>
        </header>

        <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <BrainCircuit className="h-48 w-48" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Our matching algorithm has updated!</h2>
            <p className="text-indigo-100 mb-6">We've refined how we match your skill tags with industry requirements. Check out your new high-score recommendations below.</p>
            <div className="flex gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                 <span className="block text-2xl font-bold">12</span>
                 <span className="text-xs text-indigo-100">Direct Matches</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                 <span className="block text-2xl font-bold">85%</span>
                 <span className="text-xs text-indigo-100">Avg. Match Score</span>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="h-56 rounded-xl bg-card border animate-pulse" />
             ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="Finding the best matches..." 
            description="We haven't found any direct matches yet. Try adding more skills to your profile."
            icon={BrainCircuit}
            actionLabel="Update Profile"
            onAction={() => window.location.href = '/profile'}
          />
        )}
      </div>
    </MainLayout>
  );
}
