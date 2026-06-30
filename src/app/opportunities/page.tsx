'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { OpportunityCard } from '@/components/OpportunityCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '@/services/api';
import { Opportunity } from '@/types';
import { toast } from "sonner";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpps, setFilteredOpps] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
const [appliedIds, setAppliedIds] = useState<number[]>([]);
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await api.get('/opportunities');
        setOpportunities(response.data);
        setFilteredOpps(response.data);
      } catch (error: any) {
        console.error('Error fetching opportunities', error);
        // Fallback to mock data on network error
        const mockOpps: any[] = [
          {
            id: 1,
            title: 'Frontend Developer Intern',
            organization: 'Google',
            location: 'Remote',
            type: 'Internship',
            category: 'Web Development',
            description: 'Join the Chrome team to build next-gen web experiences.',
            stipend: '$2500/month',
            deadline: '2026-08-30',
            postedDate: '2026-06-15',
            skills: ['React', 'TypeScript', 'Tailwind'],
            applyLink: 'https://careers.google.com'
          },
          {
            id: 2,
            title: 'Cybersecurity Scholarship',
            organization: 'Microsoft',
            location: 'Global',
            type: 'Scholarship',
            category: 'Security',
            description: 'Full funding for students pursuing cybersecurity degrees.',
            stipend: '$10,000',
            deadline: '2026-12-01',
            postedDate: '2026-06-18',
            skills: ['Network Security', 'Python'],
            applyLink: 'https://microsoft.com'
          }
        ];
        setOpportunities(mockOpps);
        setFilteredOpps(mockOpps);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  useEffect(() => {
    let result = opportunities;
    
    if (activeTab !== 'All') {
      result = result.filter(opp => opp.type === activeTab);
    }
    
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(opp => 
        opp.title.toLowerCase().includes(query) || 
        opp.organization.toLowerCase().includes(query)
      );
    }
    
    setFilteredOpps(result);
  }, [search, activeTab, opportunities]);

const handleApply = async (id: number) => {
  try {
    await api.post("/applications", {
      opportunityId: id,
    });

    toast.success("Application submitted successfully!", {
      description: "You can track it from the Applications page.",
    });

    setAppliedIds((prev) => [...prev, id]);

  } catch (error) {
    console.error(error);

    toast.error("Application failed", {
      description: "Please try again.",
    });
  }
};

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <header>
            <h1 className="text-3xl font-bold tracking-tight">Explore Opportunities</h1>
            <p className="text-muted-foreground mt-1">Discover internships, scholarships, and hackathons.</p>
          </header>
          
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by role or company..." 
                className="pl-9 h-11 bg-card" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-11">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="All" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-md bg-muted/50 p-1">
            <TabsTrigger value="All" className="rounded-md">All</TabsTrigger>
            <TabsTrigger value="Internship" className="rounded-md">Internships</TabsTrigger>
            <TabsTrigger value="Scholarship" className="rounded-md">Scholarships</TabsTrigger>
            <TabsTrigger value="Hackathon" className="rounded-md">Hackathons</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <LoadingSkeleton type="card" />
        ) : filteredOpps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpps.map((opp) => (
  <OpportunityCard
  key={opp.id}
  opportunity={opp}
  onApply={handleApply}
  applied={appliedIds.includes(opp.id)}
/>
))}
          </div>
        ) : (
          <EmptyState 
            title="No opportunities found" 
            description={search ? `No results for "${search}" in ${activeTab}` : "Looks like we're still processing new listings."}
            onAction={() => {setSearch(''); setActiveTab('All');}}
            actionLabel="Clear all filters"
          />
        )}

        {filteredOpps.length > 0 && (
          <div className="flex items-center justify-center space-x-2 pt-8">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
               <Button variant="outline" size="sm" className="bg-indigo-600 text-white border-indigo-600">1</Button>
               <Button variant="ghost" size="sm">2</Button>
               <Button variant="ghost" size="sm">3</Button>
            </div>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
