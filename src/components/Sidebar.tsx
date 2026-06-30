'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Zap,
  FileCheck,
  UserCircle,
  Heart,
  LogOut,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/opportunities', label: 'Opportunities', icon: Briefcase },
  { href: '/recommendations', label: 'Recommendations', icon: Zap },
  { href: '/applications', label: 'Applications', icon: FileCheck },

  { href: '/saved', label: 'Saved', icon: Heart },

  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-card border-r transition-all duration-300 z-50",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6">
          {!collapsed && (
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              CareerPort
            </span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 px-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-link",
                pathname === item.href && "sidebar-link-active"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};
