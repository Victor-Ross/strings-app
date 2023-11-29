'use client';
import useSWR, { mutate } from 'swr';

interface UserPageHeaderProps {
  username: string;
}

export function UserPageHeader({ username }: UserPageHeaderProps) {
  const {
    data: dataUser,
    error: errorUser,
    isLoading: isLoadingUser,
  } = useSWR(`/api/users?username=${username}`);

  const {
    data: dataFollow,
    error: errorFollow,
    isLoading: isLoadingFollow,
  } = useSWR(() => `/api/follows?user_id=${dataUser.data[0].id}`);

  if (errorFollow || errorUser) {
    return <div>Failed to load</div>;
  }

  if (isLoadingFollow || isLoadingUser) {
    return <div>Loading...</div>;
  }

  const user = dataUser.data[0];

  async function handleUnfollow() {
    const res = await fetch(`/api/follows/${user.id}`, { method: 'delete' });

    if (res.ok) {
      mutate(`/api/follows?user_id=${user.id}`);
    }
  }

  async function handleFollow() {
    const res = await fetch('/api/follows/', {
      method: 'post',
      body: JSON.stringify({
        user_id: user.id,
      }),
    });

    if (res.ok) {
      mutate(`/api/follows?user_id=${user.id}`);
    }
  }

  return (
    <header>
      <div>
        <h1>{username}</h1>
        {dataFollow.data.length > 0 ? (
          <button onClick={handleUnfollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </header>
  );
}
