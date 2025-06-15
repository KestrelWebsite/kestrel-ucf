import NavBarLink from "./NavBarLink";

const links: { label: string; href: string; isNewWindow?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "DevLogs", href: "/devlogs" },
  { label: "Teams", href: "/teams" },
  { label: "Contributions", href: "/contributions" },
  {
    label: "Github",
    href: "https://github.com/Autonomous-droneProject/Main",
    isNewWindow: true,
  },
];

export default function NavBar() {
  return (
    <nav>
      <header className="flex flex-row bg-neutral-800/80 h-12">
        <div className="space"></div>
        <div className="w-full flex justify-center items-center gap-20 py-2">
          {links.map((link) => (
            <NavBarLink key={link.label} {...link} />
          ))}
        </div>
      </header>
    </nav>
  );
}
