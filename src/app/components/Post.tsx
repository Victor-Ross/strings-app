import Link from 'next/link';
import { IPost } from '../types';
import Image from 'next/image';

interface PostProps {
  post: IPost;
}

export function Post({ post }: PostProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const createdAt = new Date(post.created_at);

  return (
    <div>
      <div>
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
        <div>
          <div>
            <div>
              <Link href={`/${post.username}`}>{post.username}</Link>
            </div>
            <div>{createdAt.toLocaleDateString('en-US', options)}</div>
          </div>
        </div>
      </div>
      <div>{post.content}</div>
    </div>
  );
}
