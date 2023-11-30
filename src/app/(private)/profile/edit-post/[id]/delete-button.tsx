import { IPost } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteButtonProps {
  post: IPost;
}

export function DeleteButton({ post }: DeleteButtonProps) {
  const router = useRouter();
  const [state, setState] = useState({ showConfirm: false });

  async function handleDeletePost() {
    const res = await fetch(`/api/posts/${post.id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/profile');
    }
  }

  function handleClick() {
    setState({ ...state, showConfirm: !state.showConfirm });
  }

  return (
    <div>
      {state.showConfirm ? (
        <button className="text-red-400" onClick={handleClick}>
          Delete Post
        </button>
      ) : (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <div className="flex flex-row gap-10">
            <button className="text-red-400" onClick={handleDeletePost}>
              Yes
            </button>
            <button className="text-blue-400" onClick={handleClick}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
