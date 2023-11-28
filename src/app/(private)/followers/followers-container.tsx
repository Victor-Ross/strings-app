'use client';
import { useState } from 'react';
import { FollowersList } from './followers-list';

export function FollowersContainer() {
  const [count, setCount] = useState(1);

  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(<FollowersList index={i} key={i} />);
  }

  return (
    <div>
      {pages}
      <div className="flex justify-center w-full">
        <button
          className="bg-slate-900 p-2 rounded-lg"
          onClick={() => setCount(count + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
