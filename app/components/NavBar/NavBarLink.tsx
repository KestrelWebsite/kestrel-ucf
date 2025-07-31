"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  label: string;
  href: string; // Internal or external link
  isNewWindow?: boolean;
}

const NavBarLink = ({ label, href, isNewWindow }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === `/${label.toLowerCase()}`;
  const baseClasses =
    "text-white hover:opacity-100 hover:underline text-xl font-semibold transition";
  const activeClass = isActive ? "opacity-100 underline" : "opacity-75";

  // Use shadcn dropdown for "Teams"
  if (label.toLowerCase() === "teams") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Clicking this now goes to /teams */}
          <Link
            href="/teams"
            className={baseClasses + activeClass}
          >
            {label}
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start" // adjust alignment as needed
          className="z-9999"
        >
          <DropdownMenuItem asChild>
            <Link href="/sensors">Sensors</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/pathing">Pathing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/ardupilot">Ardupilot</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/model">Model</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/leadership">Leadership</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/website">Website</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Use shadcn dropdown for "Contributors"
  if (label.toLowerCase() === "contributions"){
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Clicking this now goes to /contributions */}
          <Link
            href="/contributions"
            className={baseClasses + activeClass}
          >
            {label}
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start" // adjust alignment as needed
          className="z-9999"
        >
          <DropdownMenuItem asChild>
            <Link href="/contributions/BlueOrigin">Blue Origin</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contributions/ACM">ACM</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contributions/AI@UCF">AI@UCF</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contributions/IEEE">IEEE</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contributions/KnightHacks">Knight Hacks</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // For normal links, use Next.js <Link>
  return (
    <Link
      href={href}
      className={baseClasses + activeClass}
      target={isNewWindow ? "_blank" : ""}
    >
      {label}
    </Link>
  );
};

export default NavBarLink;
