import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import{
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export interface TeamCardProps{
    title: string;
    description: string;
    image: StaticImageData;
    link: string;
}

const TeamCard = ({ title, description, image, link}: TeamCardProps) => {
    return(
        <Card className = "w-full max-w-xs bg-slate-600 border-slate-700 hover:scale-102 hover:shadow-xl transition-transform">
            <CardHeader>
                <Image
                    className = "rounded-lg mb-4 shadow-md transition-all duration-300"
                    src = {image}
                    alt = {title}
                />
                <CardTitle className = "text-2xl text-white">
                    {title}
                </CardTitle>
                <CardDescription className = "overflow-y-auto max-h-[300px] text-white/50">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent />
            <CardFooter>
                <Link href = {link} className = "text-blue-300 hover:underline text-sm">
                    Learn More
                </Link>
            </CardFooter>
        </Card>
    );
};

export default TeamCard;
