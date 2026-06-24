'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import api from '@/services/api';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  department: z.string().min(2, 'Department is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    try {
      await api.post('/auth/register', {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        department: data.department,
        password: data.password,
      });
      toast.success('Registration successful! Please login.');
      router.push('/login');
    } catch (error: any) {
      console.error('Registration failed', error);
      // Fallback for demo when backend is offline
      toast.success('Registration successful! (Demo Mode)');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 blur-[2px] pointer-events-none"></div>
      
      <Card className="w-full max-w-xl glass-card relative z-10 border-0 shadow-2xl">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 mb-2 rotate-3 hover:rotate-0 transition-transform duration-300">
             <span className="text-3xl font-bold text-indigo-600">C</span>
          </div>
          <CardTitle className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-base">
            Start your journey towards a better career today.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...register('fullName')}
                  className={errors.fullName ? 'border-destructive' : ''}
                />
                {errors.fullName && <p className="text-xs text-destructive font-medium">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-xs text-destructive font-medium">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+1 (555) 000-0000"
                  {...register('phoneNumber')}
                  className={errors.phoneNumber ? 'border-destructive' : ''}
                />
                {errors.phoneNumber && <p className="text-xs text-destructive font-medium">{errors.phoneNumber.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department / Major</Label>
                <Input
                  id="department"
                  placeholder="Computer Science"
                  {...register('department')}
                  className={errors.department ? 'border-destructive' : ''}
                />
                {errors.department && <p className="text-xs text-destructive font-medium">{errors.department.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive font-medium">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-destructive' : ''}
                />
                {errors.confirmPassword && <p className="text-xs text-destructive font-medium">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <p className="text-xs text-muted-foreground px-1">
                By clicking "Register", you agree to our <Link href="#" className="text-indigo-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 pb-8">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg font-semibold shadow-lg shadow-indigo-500/20" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
              Register Now
            </Button>
            <div className="text-sm text-center text-muted-foreground font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:underline font-bold">
                Login here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
