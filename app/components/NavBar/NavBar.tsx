'use client';

import Link from 'next/link';
import NavBarLink from './NavBarLink';
import { TEAM_KEYS, TEAM_META } from '@/lib/devlogs';

const links: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'Teams', href: '/teams' },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[2000]">
      {/* ✅ Transparent floating navbar fully aligned to right */}
      <header className="relative bg-transparent h-14">
        {/* Changed from max-w-7xl to full width */}
        <div className="w-full h-full px-6">
          <ul className="h-full flex items-center justify-end gap-16 pr-6">
            {links.map((link) => (
              <li key={link.label} className="list-none">
                <NavBarLink {...link} />
              </li>
            ))}

            {/* ✅ Devlogs dropdown — removed mr-10 */}
            <li className="relative list-none group">
              <NavBarLink label="Devlogs" href="/devlogs" />
              <div
                className="
                  absolute right-0 top-full z-[2100] w-56 rounded-md
                  border border-white/10 bg-black/90
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-opacity duration-150 ease-out
                "
              >
                <ul className="py-2">
                  {TEAM_KEYS.map((key) => {
                    const { title, slug } = TEAM_META[key];
                    return (
                      <li key={slug}>
                        <Link
                          href={`/devlogs/${slug}`}
                          className="block px-3 py-2 text-sm hover:bg-white/10"
                        >
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </nav>
  );
}
