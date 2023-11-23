'use client';

import React, { FormEvent, useState } from 'react';

export function Form() {
  const [username, setUsername] = useState<undefined | string>('');
  const [password, setPassword] = useState<undefined | string>('');
  const [confirmPassword, setConfirmPassword] = useState<undefined | string>(
    ''
  );
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors([]);

    if (password !== confirmPassword) {
      setErrors((state) => [...state, 'Passwords do not match']);
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (res.ok) {
      window.location.href = '/signin';
    } else {
      alert('Sign Up Failed');
    }
  }

  return (
    <form
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <h3 className="font-semibold">Sign Up</h3>
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
      <div className="flex flex-col gap-2">
        <label>Confirm password</label>
        <input
          className="text-black p-3 border border-slate-700"
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </div>
      <button className="mt-4 p-3 bg-slate-900 rounded-lg" type="submit">
        Sign Up
      </button>
      {errors.map((error) => (
        <div key={error} className="text-red-600">
          {error}
        </div>
      ))}
    </form>
  );
}
