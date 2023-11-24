'use client';

import useSWR from 'swr';
import { User } from '../components/User';

export function Header() {
  const { data, error, isLoading } = useSWR('/api/users/profile');

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return <div>Loading bad...</div>;
  }

  return (
    <header className="flex flex-row justify-between items-center w-full p-5 bg-slate-800 rounded-lg">
      <div>
        <h1 className="font-mono text-lg">Strings</h1>
      </div>
      <div>
        <User user={data.data} href="account" />
      </div>
    </header>
  );
}
