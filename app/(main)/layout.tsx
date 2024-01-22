'use client';

import React from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import Navigation from './_components/Navigation';
import { SearchCommand } from './_components/SearchCommand';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }
  if (!isAuthenticated) redirect('/');
  return (
    <div className='h-full flex dark:bg-[#1f1f1f] '>
      <Navigation />
      <main className='flex-1 overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
