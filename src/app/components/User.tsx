import Link from 'next/link';
import { IUser } from '../types';
import Image from 'next/image';

interface UserProps {
  user: IUser;
  href: string;
}

export function User({ user, href }: UserProps) {
  return (
    <div>
      <Link
        className="flex flex-row items-center"
        href={`/${href || user.username}`}
      >
        <div>
          {user.avatar ? (
            <Image
              className="rounded-full mr-3"
              src={user.avatar}
              width={50}
              height={50}
              alt={user.username}
            />
          ) : (
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-full mr-3" />
          )}
        </div>
        <div>{user.username}</div>
      </Link>
    </div>
  );
}
