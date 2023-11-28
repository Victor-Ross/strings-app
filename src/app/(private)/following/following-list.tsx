import { User } from '@/app/components/User';
import { IUser } from '@/app/types';
import useSWR from 'swr';

interface FollowingListProps {
  index: number;
}

type ProfileResponse = {
  data: IUser;
};

type FollowerResponse = {
  data: IUser[];
};

export function FollowingList({ index }: FollowingListProps) {
  const { data: userData } = useSWR<ProfileResponse>('/api/users/profile');
  const { data: followerData } = useSWR<FollowerResponse>(
    () => `/api/users/${userData?.data.id}/following?page=${index}`
  );

  if (!followerData) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {followerData.data.map((user) => (
        <li className="my-5" key={user.id}>
          <User href="/" user={user} />
        </li>
      ))}
    </ul>
  );
}
