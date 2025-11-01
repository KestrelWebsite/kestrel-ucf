import Image from "next/image";
import Link from "next/link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  Link2Icon,
  FileTextIcon,
} from "@radix-ui/react-icons";

export interface MemberCardProps {
  name: string;
  role: string | string[]; // allow arrays too
  major?: string;
  contribution: string;
  image?: string; // ✅ made optional
  links: Array<LinkProps>;
}

interface LinkProps {
  type: string;
  href: string;
}

const MemberCard = ({
  name,
  role,
  major,
  contribution,
  image,
  links,
}: MemberCardProps) => {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm text-gray-400">
          {Array.isArray(role) ? role.join(", ") : role}
        </p>
        {major && <p className="text-sm text-gray-500 italic mt-1">{major}</p>}
      </div>

      {/* Contribution / Description */}
      <p className="mt-4 text-gray-300 text-sm leading-relaxed break-words">
        {contribution}
      </p>

      {/* Links */}
      {links && links.length > 0 && (
        <div className="mt-4 flex gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
              title={link.type}
            >
              <IconSwitch type={link.type} className="w-6 h-6" alt={link.type} />
            </Link>
          ))}
        </div>
      )}

      {/* ✅ Image (Optional) */}
      {image && image !== "placeholder" && (
        <div className="mt-4 w-full h-40 overflow-hidden rounded-md">
          <Image
            src={image}
            alt={name}
            width={400}
            height={200}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      )}
    </div>
  );
};

const IconSwitch = (props: { type: string; className: string; alt: string }) => {
  switch (props.type.toLowerCase()) {
    case "github":
      return <GitHubLogoIcon {...props} />;
    case "linkedin":
      return <LinkedInLogoIcon {...props} />;
    case "cover_letter":
    case "cv":
    case "resume":
      return <FileTextIcon {...props} />;
    default:
      return <Link2Icon {...props} />;
  }
};

export default MemberCard;
