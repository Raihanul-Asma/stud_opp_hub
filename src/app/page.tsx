'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Briefcase, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <nav className="fixed top-0 w-full z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            CareerPort
          </span>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-indigo-600 transition-colors">Login</Link>
            <Link href="/register" className={cn(buttonVariants({ variant: "default" }), "bg-indigo-600 hover:bg-indigo-700")}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-4"
          >
            <Zap className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold tracking-wide uppercase">AI-Powered Career Guidance</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Bridge the gap between <br />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Dreams & Success
            </span>
          </motion.h1>

          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Personalized recommendations, internship tracking, and career guidance all in one premium platform.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8"
          >
            <Link 
              href="/register" 
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-lg shadow-lg shadow-indigo-500/25")}
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/login" 
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-8 text-lg")}
            >
              Explore Features
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <Link href="/profile" className="glass-card p-8 text-left space-y-4 group cursor-pointer block hover:border-indigo-500/50 transition-all">
               <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                 <GraduationCap className="h-6 w-6" />
               </div>
               <h3 className="text-xl font-bold">Academic Tracking</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">Keep your academic profile updated and let our system suggest the best paths for your CGPA.</p>
            </Link>
            
            <Link href="/opportunities" className="glass-card p-8 text-left space-y-4 group cursor-pointer block hover:border-purple-500/50 transition-all">
               <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                 <Briefcase className="h-6 w-6" />
               </div>
               <h3 className="text-xl font-bold">Opportunity Hub</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">Access a curated list of internships, scholarships, and hackathons from top global companies.</p>
            </Link>
            
            <Link href="/recommendations" className="glass-card p-8 text-left space-y-4 group cursor-pointer block hover:border-amber-500/50 transition-all">
               <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                 <Zap className="h-6 w-6" />
               </div>
               <h3 className="text-xl font-bold">Matching Engine</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">Our AI analyzes your skill tags to find opportunities where you have the highest chance of success.</p>
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="py-12 border-t mt-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-bold text-lg text-muted-foreground">CareerPort &copy; 2026</span>
            <div className="flex gap-8 text-sm text-muted-foreground">
               <Link href="#" className="hover:text-indigo-600">Privacy Policy</Link>
               <Link href="#" className="hover:text-indigo-600">Terms of Service</Link>
               <Link href="#" className="hover:text-indigo-600">Support</Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
