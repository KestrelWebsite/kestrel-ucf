// app/components/NavBar/NavBar.tsx
'use client';

import Link from 'next/link';
import NavBarLink from './NavBarLink';
import { TEAM_KEYS, TEAM_META } from '@/lib/devlogs';

const links: { label: string; href: string; isNewWindow?: boolean }[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Teams', href: '/teams' },
  {
    label: 'Github',
    href: 'https://github.com/Autonomous-droneProject/Main',
    isNewWindow: true,
  },
 ]; 

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[2000]">
      <header className="relative bg-neutral-800/80 backdrop-blur-md h-12">
        <div className="mx-auto max-w-7xl h-full">
        <ul className="h-full flex items-center justify-end gap-20">
            {links.map((link) => (
              <li key={link.label} className="list-none">
                <NavBarLink {...link} />
              </li>
            ))}

            {/* Devlogs + dropdown */}
            <li className="relative list-none group">
              {/* Clicking label navigates to /devlogs */}
              <NavBarLink label="Devlogs" href="/devlogs" />

              {/* Dropdown panel (flush under trigger, no gap) */}
              <div
                className="
                  absolute left-0 top-full z-[2100] w-56 rounded-md
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
