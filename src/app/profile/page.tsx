'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Upload, X, FileText, Loader2, Plus, User as UserIcon } from 'lucide-react';
import api from '@/services/api';
import { Profile } from '@/types';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const profileSchema = z.object({
  fullName: z.string().min(2),
  department: z.string().min(2),
  year: z.string(),
  cgpa: z.number().min(0).max(10),
  interests: z.string(),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [skills, setSkills] = useState<string[]>(['Java', 'React', 'SQL']);
  const [newSkill, setNewSkill] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, reset } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        const data = response.data;
        reset({
          fullName: data.fullName,
          department: data.department,
          year: data.year,
          cgpa: data.cgpa,
          interests: data.interests.join(', '),
        });
        setSkills(data.skills);
        setResumeUrl(data.resumeUrl);
      } catch (error: any) {
        console.error('Error fetching profile', error);
        reset({
          fullName: 'Demo Student',
          department: 'Computer Science',
          year: '3rd Year',
          cgpa: 8.5,
          interests: 'AI, Web Development, Cloud Computing',
        });
        setSkills(['React', 'Java', 'Python', 'AWS']);
      }
    };
    fetchProfile();
  }, [reset]);

  const onProfileSubmit = async (data: ProfileValues) => {
    setIsLoading(true);
    try {
      await api.put('/profile', {
        ...data,
        skills,
        interests: data.interests.split(',').map(s => s.trim()),
      });
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
      await uploadResume(file);
    }
  };

  const uploadResume = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const resp = await api.post('/profile/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResumeUrl(resp.data.url);
      toast.success('Resume uploaded successfully!');
    } catch (error: any) {
      toast.error('Resume upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your academic and professional information.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Academic Details</CardTitle>
                <CardDescription>Keep your CGPA and department info up to date for better recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onProfileSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...register('fullName')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" {...register('department')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year of Study</Label>
                    <Input id="year" {...register('year')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">Current CGPA</Label>
                    <Input id="cgpa" type="number" step="0.01" {...register('cgpa', { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="interests">Interests (comma separated)</Label>
                    <Input id="interests" placeholder="AI, Web Development, Cybersecurity" {...register('interests')} />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Profile Updates
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>Add technical skills to standout to organizations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <Input 
                    placeholder="Add a skill..." 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button variant="outline" size="icon" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Resume</CardTitle>
                <CardDescription>Upload your latest resume (PDF or DOCX).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="border-2 border-dashed border-indigo-500/30 rounded-xl p-8 flex flex-col items-center justify-center bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors cursor-pointer relative"
                >
                  <Input 
                    type="file" 
                    accept=".pdf,.docx" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={handleResumeChange}
                  />
                  <div className="p-3 bg-indigo-500/20 rounded-full mb-4">
                    {isUploading ? (
                      <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                    ) : (
                      <Upload className="h-8 w-8 text-indigo-600" />
                    )}
                  </div>
                  <p className="text-sm font-medium">Click or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 10MB</p>
                </div>

                {(resumeUrl || resume) && (
                  <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
                    <FileText className="h-8 w-8 text-indigo-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{resume?.name || 'Resume.pdf'}</p>
                      <p className="text-xs text-muted-foreground">Uploaded successfully</p>
                    </div>
                    {resumeUrl && (
                      <a 
                        href={resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "link", size: "sm" }), "text-indigo-600")}
                      >
                        View
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card bg-indigo-600 text-white overflow-hidden">
               <CardContent className="p-0">
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <UserIcon className="h-24 w-24" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Profile Strength</h3>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-4xl font-extrabold">85%</span>
                    </div>
                    <p className="text-indigo-100 text-sm mb-4">You're doing great! Add a few more projects to reach 100%.</p>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
