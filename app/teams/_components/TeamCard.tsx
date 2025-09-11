import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export interface TeamCardProps {
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ title, description, image, link }) => {
  return (
    <Link href={link}>
      <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* Image */}
        <div className="h-30 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Text content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition">
            {title}
          </h3>
          <p className="mt-2 text-gray-300 text-sm group-hover:text-gray-200 transition">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
