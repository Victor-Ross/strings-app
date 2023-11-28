import useSWR from 'swr';
import { IPost } from '../types';
import { Post } from './Post';

interface PostListProps {
  index: number;
  username: string;
}

type PostResponse = {
  data: IPost[];
};

export function PostList({ index, username }: PostListProps) {
  const { data, error, isLoading } = useSWR<PostResponse>(
    () => `/api/posts?page=${index}&username=${username}`
  );

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.data.map((post, index) => (
        <li key={index} className="my-5">
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
