import useSWR from 'swr';
import { IPost } from '@/app/types';
import { Post } from '@/app/components/Post';

interface FeedListProps {
  index: number;
}

type PostApiCall = {
  data: IPost[];
};

export function FeedList({ index }: FeedListProps) {
  const { data, error, isLoading } = useSWR<PostApiCall>(
    `/api/posts/feed?page=${index}`
  );

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return <div>Is loading bad bad...</div>;
  }

  return (
    <ul>
      {data!.data.map((post) => (
        <li key={post.id} className="my-5">
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
