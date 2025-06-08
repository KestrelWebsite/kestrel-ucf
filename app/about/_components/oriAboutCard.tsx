import Image, { StaticImageData } from "next/image";

export interface AboutCardProps {
  title: string;
  description: string;
  image: StaticImageData;
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AboutCard = ({ title, description, image }: AboutCardProps) => {
  return (
    <Card className="w-full h-fit bg-slate-600 border-slate-700">
      <CardHeader>
        <Image
          className="rounded-lg mb-4 shadow-md hover:scale-102 transition-all duration-300 h-50"
          src={image}
          alt={title}
        />
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <CardDescription className="overflow-y-auto max-h-[300px] text-white/50">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default AboutCard;
