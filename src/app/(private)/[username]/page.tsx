import { PostContainer } from '@/app/components/post-container';
import { UserPageHeader } from './user-page-header';

interface UserPageProps {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <div>
      <UserPageHeader username={params.username} />
      <PostContainer username={params.username} />
    </div>
  );
}
