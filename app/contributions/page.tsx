//import Image, { StaticImageData } from "next/image";
//import react from "react";
import imageACM from "@/public/clubs/acm.jpg";
import imageAIUCF from "@/public/clubs/aiucf.jpg";
import imageIEEE from "@/public/clubs/ieee.jpg";
import imageKnightHacks from "@/public/clubs/knighthacks.jpg";
import imageBlueOrigin from "@/public/clubs/blueorigin.jpg";
import ContributorsCard, { ContributorsCardProps } from "./_components/ContributorsCard";
import Link from "next/link";

const ContributorsPage = () => {
    const cards: ContributorsCardProps[] = [
        {
            title: "ACM",
            description: "...",
            image: imageACM,
            link: "/contributions/ACM",
        },
        {
            title: "AI@UCF",
            description: "...",
            image: imageAIUCF,
            link: "/contributions/AIUCF",
        },
        {
            title: "IEEE",
            description: "...",
            image: imageIEEE,
            link: "/contributions/IEEE",
        },
        {
            title: "Knight Hacks",
            description: "...",
            image: imageKnightHacks,
            link: "/contributions/KnightHacks",
        },
        {
            title: "Blue Origin",
            description: "...",
            image: imageBlueOrigin,
            link: "/contributions/BlueOrigin",
        },
    ];

    return(
        <div className = "h-fit w-full bg-gradient-to-t from-slate-700 to-slate-900">
            {/* Heading */}
            <div className = "pt-[80px] text-5xl font-bold text-center text-neutral-200 font-mono">
                Meet the Contributors
            </div>

            {/* Intro Description */}
            <div className = "text-amber-50 pt-6 text-center font-serif justify-center w-2/3 items-center m-auto">
                These contributors are ...
            </div>

            {/* Card Grid */}
            <div className = "w-full pt-10 px-4 sm: px-4 sm:px-6 lg:px-8">
                <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card) => (
                        <Link
                            href = {card.link}
                            key = {card.title}
                            className = "block transoform hover:-translate-y-1 transition"
                        >
                            <ContributorsCard {...card} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContributorsPage;