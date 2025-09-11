"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
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
    let [open, setOpen] = useState(false);

    return (
      <div onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <DropdownMenu open={open}>
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
              <Link href="/teams/leadership">Leadership</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/teams/embedded">Embedded</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/teams/pathing">Pathing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/teams/hardware">Hardware</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/teams/model">Model</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/teams/simulation">Simulation</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/teams/website">Website</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
