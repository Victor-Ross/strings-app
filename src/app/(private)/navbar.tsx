import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex max-w-md w-full p-5 bg-slate-800 rounded-lg my-2">
      <ul className="flex flex-row justify-around w-full">
        <li>
          <Link
            className={pathname.startsWith('/feed') ? 'text-green-400' : ''}
            href="/feed"
          >
            Feed
          </Link>
        </li>
        <li>
          <Link
            className={pathname.startsWith('/profile') ? 'text-green-400' : ''}
            href="/profile"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            className={
              pathname.startsWith('/following') ? 'text-green-400' : ''
            }
            href="/following"
          >
            Following
          </Link>
        </li>
        <li>
          <Link
            className={
              pathname.startsWith('/followers') ? 'text-green-400' : ''
            }
            href="/followers"
          >
            Followers
          </Link>
        </li>
      </ul>
    </nav>
  );
}
