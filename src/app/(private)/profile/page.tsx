'use client';
import useSWR from 'swr';
import { Form } from './form';
import { PostContainer } from '@/app/components/post-container';

type ProfileResponse = {
  data: {
    username: string;
  };
};

export default function Profile() {
  const { data, error, isLoading } =
    useSWR<ProfileResponse>('/api/users/profile');

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h2>Profile</h2>
      <Form />
      <PostContainer username={data.data.username} showEditButton={true} />
    </main>
  );
}
