import { useState } from 'react';
import { PostList } from './post-list';

interface PostContainerProps {
  username: string;
}

export function PostContainer({ username }: PostContainerProps) {
  const [count, setCount] = useState(1);

  const pages = [];

  for (let i = 0; i < count; i++) {
    pages.push(<PostList index={i} username={username} key={i} />);
  }

  return (
    <div className="my-5">
      {pages}
      <div className="flex flex-row justify-center">
        <button
          className="bg-slate-900 rounded-lg"
          onClick={() => setCount(count + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
