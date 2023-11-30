'use client';

import { FormEvent, useState } from 'react';
import { useSWRConfig } from 'swr';

export function Form() {
  const { mutate } = useSWRConfig();
  const [post, setPost] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        content: post,
      }),
    });

    if (res.ok) {
      setPost('');

      mutate((key) => typeof key === 'string' && key.startsWith('/api/posts'));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full p-2 my-2 bg-gray-700 rounded-lg"
        placeholder="What is happening?"
        onChange={(e) => setPost(e.target.value)}
      />
      <button className="p-2 bg-slate-900 rounded-lg" type="submit">
        Post
      </button>
    </form>
  );
}
