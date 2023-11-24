'use client';

import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { Header } from './header';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { fetcher } from '../util/fetcher';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md m-auto">
        <Header />
        <Navbar />
        <main className="w-full p-5 bg-slate-800 rounded-lg my-2">
          {children}
        </main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
