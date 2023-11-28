'use client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const res = await fetch('/api/logout');

    if (res.ok) {
      router.push('/signin');
    }
  }

  return (
    <button
      className="text-green-400 underline p-2 rounded-lg my-5"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}
