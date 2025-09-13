"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  label: string;
  href: string; // Internal or external link
  isNewWindow?: boolean;
}

/** A helper that opens on hover, but the label itself is a normal Link (click navigates). */
function HoverMenuLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Link href={href} className={className}>
          {label}
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="z-[9999]"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NavBarLink = ({ label, href, isNewWindow }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === `/${label.toLowerCase()}`;
  const baseClasses =
    "text-white hover:opacity-100 hover:underline text-xl font-semibold transition ";
  const activeClass = isActive ? "opacity-100 underline" : "opacity-75";
  const classes = baseClasses + activeClass;

  const lower = label.toLowerCase();

  // --- TEAMS (kept as your original structure; no hooks inside conditional) ---
  if (lower === "teams") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Clicking this now goes to /teams */}
          <Link href="/teams" className={classes}>
            {label}
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start" // adjust alignment as needed
          className="z-[9999]"
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

  // --- CONTRIBUTIONS (hover opens submenu; click navigates) ---
  if (lower === "contributions") {
    return (
      <HoverMenuLink
        href="/contributions"
        label="Contributions"
        className={classes}
      >
        <DropdownMenuItem asChild>
          <Link href="/contributions/BlueOrigin">Blue Origin</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/contributions/ACM">ACM</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {/* Prefer a URL-safe slug (folder should be app/contributions/ai-ucf/page.tsx) */}
          <Link href="/contributions/ai-ucf">AI@UCF</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/contributions/IEEE">IEEE</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/contributions/KnightHacks">Knight Hacks</Link>
        </DropdownMenuItem>
      </HoverMenuLink>
    );
  }

  // --- Default: normal links ---
  return (
    <Link
      href={href}
      className={classes}
      target={isNewWindow ? "_blank" : undefined}
      rel={isNewWindow ? "noopener noreferrer" : undefined}
    >
      {label}
    </Link>
  );
};

export default NavBarLink;
