'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Form() {
  const router = useRouter();

  const [username, setUsername] = useState<undefined | string>('');
  const [password, setPassword] = useState<undefined | string>('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (res.ok) {
      router.push('/feed');
    } else {
      alert('Login Failed');
    }
  }

  return (
    <form
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <h3 className="font-semibold">Sign In</h3>
      </div>
      <div className="my-3">
        <hr />
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            className="text-black p-3 border border-slate-700"
            type="text"
            id="username"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>Password</label>
        <input
          className="text-black p-3 border border-slate-700"
          type="password"
          id="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button className="mt-4 p-3 bg-slate-900 rounded-lg" type="submit">
        Sign In
      </button>
    </form>
  );
}
