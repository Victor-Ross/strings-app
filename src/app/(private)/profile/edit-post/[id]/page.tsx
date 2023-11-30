'use client';

import useSWR from 'swr';
import { Form } from './form';
import { DeleteButton } from './delete-button';

interface EditPostProps {
  params: {
    id: number;
  };
}

export default function EditPost({ params }: EditPostProps) {
  const { data, error, isLoading } = useSWR(`/api/posts/${params.id}`);

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
      <div className="flex flex-col gap-10">
        <Form post={data.data} />
        <DeleteButton post={data.data} />
      </div>
    </div>
  );
}
