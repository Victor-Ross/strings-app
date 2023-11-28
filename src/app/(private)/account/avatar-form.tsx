'use client';
import { IUser } from '@/app/types';
import Image from 'next/image';
import useSWR from 'swr';

type ProfileResponse = {
  data: IUser;
};

export default function AvatarForm() {
  const { data, isLoading, error } =
    useSWR<ProfileResponse>('/api/users/profile');

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const user = data.data;

  return (
    <form>
      {user.avatar ? (
        <div>
          <Image
            className="rounded-full m-auto my-5"
            src={user.avatar}
            alt={user.username}
            width={200}
            height={200}
          />
        </div>
      ) : (
        <div className="w-[200px] h-[200px] bg-slate-900 rounded-full m-auto my-5" />
      )}
      <input type="file" />
    </form>
  );
}
