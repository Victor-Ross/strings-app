'use client';

import { IPost } from '@/app/types';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface PostProps {
  post: IPost;
}

export function Form({ post }: PostProps) {
  const [content, setContent] = useState(post.content);

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        content,
      }),
    });

    if (res.ok) {
      setContent('');
      router.push('/profile');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="bg-gray-700 p-2 rounded-lg w-full my-2"
        placeholder="What is happening?"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button className="bg-slate-900 p-2 rounded-lg" type="submit">
        Update Post
      </button>
    </form>
  );
}
