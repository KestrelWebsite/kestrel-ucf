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

export interface ContributorsCardProps{
    title: string;
    description: string;
    image: StaticImageData;
    link: string;
}

const ContributorsCard = ({ title, description, image, link}: ContributorsCardProps) => {
    return(
        <Card className = "bg-slate-600 h-fit w-full rounded-xl p-4 w-[320px] border-slate-700 shadow-md h-full">
            <CardHeader>
                <Image
                    className = "w-full rounded-lg mb-4 shadow-md transition-all duration-300 h-48 hover:scale-102 object-contain"
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
                    Link to Contributor&apos;s Website
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ContributorsCard;