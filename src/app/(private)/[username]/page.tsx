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
      <div>posts container {params.username}</div>
    </div>
  );
}
