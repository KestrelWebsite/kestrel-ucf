import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export interface TeamCardProps {
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
  status?: string;
  launchReadiness?: string;
  step4Objectives?: string[];
}

const readinessColor = (lr?: string) => {
  if (!lr) return "text-gray-300";
  const v = lr.toLowerCase();
  if (v === "green") return "text-green-400";
  if (v === "yellow") return "text-yellow-400";
  if (v === "red") return "text-red-400";
  return "text-gray-300";
};

const TeamCard: React.FC<TeamCardProps> = ({
  title,
  description,
  image,
  link,
  status,
  launchReadiness,
  step4Objectives,
}) => {
  return (
    <Link href={link}>
      <div
        className="
          group relative 
          rounded-2xl border border-white/10 
          bg-white/5 backdrop-blur-md 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 
          overflow-hidden 
          flex flex-col 
          min-h-[420px]   /* Uniform height */
          max-w-[300px]   /* Uniform width */
        "
      >
        {/* Image */}
        {image && (
          <div className="h-40 w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Text content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition">
              {title}
            </h3>
            <p className="mt-2 text-gray-300 text-sm">{description}</p>

            {/* Status + Readiness */}
            {status && (
              <p className="mt-2 text-sm">
                <span className="font-semibold">Status:</span> {status}
              </p>
            )}
            {launchReadiness && (
              <p className={`mt-1 text-sm ${readinessColor(launchReadiness)}`}>
                <span className="font-semibold">Readiness:</span>{" "}
                {launchReadiness}
              </p>
            )}
          </div>

          {/* Step 4 Objectives */}
          {step4Objectives && step4Objectives.length > 0 && (
            <ul className="mt-3 text-xs list-disc list-inside text-gray-400">
              {step4Objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
