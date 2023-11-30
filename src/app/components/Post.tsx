import Link from 'next/link';
import { IPost } from '../types';
import Image from 'next/image';

interface PostProps {
  post: IPost;
  showEditButton?: boolean;
}

export function Post({ post, showEditButton = false }: PostProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const createdAt = new Date(post.created_at);

  return (
    <div className="flex flex-row">
      <div>
        {post.avatar ? (
          <Link href={`/${post.username}`}>
            <Image
              className="rounded-full mr-3"
              src={post.avatar}
              width={50}
              height={50}
              alt={post.username}
            />
          </Link>
        ) : (
          <div className="w-[50px] h-[50px] bg-slate-600 rounded-full mr-3" />
        )}
      </div>
      <div className="flex flex-col max-w-xs">
        <div className="font-bold">
          <Link href={`/${post.username}`}>{post.username}</Link>
        </div>
        <div className="text-slate-400">
          {createdAt.toLocaleDateString('en-US', options)}
        </div>
        <div>{post.content}</div>
      </div>
      {showEditButton && (
        <div className="text-right flex-grow">
          <Link
            className="text-green-400"
            href={`/profile/edit-post/${post.id}`}
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}
