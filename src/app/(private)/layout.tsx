import { ReactNode } from 'react';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
