'use client';

import Link from 'next/link';
import NavBarLink from './NavBarLink';
import { TEAM_KEYS, TEAM_META } from '@/lib/devlogs';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[3000] pointer-events-none">
      <header className="backdrop-blur-lg bg-black/20 border-b border-white/10 h-14 flex items-center justify-center w-full pointer-events-auto">
        <ul className="flex items-center justify-center gap-4 sm:gap-10 md:gap-25 text-sm sm:text-base font-medium text-white px-4 w-full flex-wrap md:flex-nowrap">
          <li className="list-none">
            <NavBarLink label="Home" href="/" />
          </li>

          <li className="relative list-none group">
            <NavBarLink label="Teams" href="/teams" />
            <div className="absolute right-0 top-full z-[3100] w-40 rounded-md border border-white/10 bg-black/90 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 ease-out">
              <ul className="py-1">
                {TEAM_KEYS.map((key) => {
                  const { title, slug } = TEAM_META[key];
                  return (
                    <li key={slug}>
                      <Link
                        href={`/teams/${slug}`}
                        className="block px-2.5 py-1.5 text-sm hover:bg-white/10"
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>

          <li className="relative list-none group">
            <NavBarLink label="Devlogs" href="/devlogs" />
            <div className="absolute left-1/2 top-full -translate-x-1/2 z-[3100] w-36 rounded-md border border-white/10 bg-black/90 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out">
              <ul className="py-1">
                {TEAM_KEYS.map((key) => {
                  const { title, slug } = TEAM_META[key];
                  return (
                    <li key={slug}>
                      <Link
                        href={`/devlogs/${slug}`}
                        className="block px-2 py-1 text-sm hover:bg-white/10"
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>

          <li className="list-none">
            <NavBarLink label="Showcase" href="/showcase" />
          </li>
        </ul>
      </header>
    </nav>
  );
}
