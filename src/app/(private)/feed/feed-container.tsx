'use client';

import { useState } from 'react';
import { FeedList } from './feed-list';

export function FeedContainer() {
  const [count, setCount] = useState(1);

  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(<FeedList index={i} key={i} />);
  }

  return (
    <div>
      {pages} <button onClick={() => setCount(count + 1)}>Load More</button>
    </div>
  );
}
