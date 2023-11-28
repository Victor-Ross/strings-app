import { User } from '@/app/components/User';
import { IUser } from '@/app/types';
import useSWR from 'swr';

interface FollowersListProps {
  index: number;
}

type ProfileResponse = {
  data: IUser;
};

type FollowerResponse = {
  data: IUser[];
};

export function FollowersList({ index }: FollowersListProps) {
  const { data: userData } = useSWR<ProfileResponse>('/api/users/profile');
  const { data: followerData } = useSWR<FollowerResponse>(
    () => `/api/users/${userData?.data.id}/followers?page=${index}`
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
