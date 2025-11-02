'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBarLinkProps {
  label: string;
  href: string;
  isNewWindow?: boolean;
}

export default function NavBarLink({ label, href, isNewWindow }: NavBarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      target={isNewWindow ? "_blank" : ""}
      className={`text-white hover:opacity-100 hover:underline text-xl font-semibold transition-opacity duration-75 ${
        isActive ? 'opacity-100' : 'opacity-70'
      }`}
    >
      {label}
    </Link>
  );
}
