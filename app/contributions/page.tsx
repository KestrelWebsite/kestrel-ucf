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
            description: "Coming soon...",
            image: imageACM,
            link: "/contributions/ACM",
        },
        {
            title: "AI@UCF",
            description: "Coming soon...",
            image: imageAIUCF,
            link: "https://ucfai.org/",
        },
        {
            title: "IEEE",
            description: "IEEE UCF is a 300-member student chapter offering hands-on ECE projects—from autonomous robotics to beginner builds—and workshops that build real-world skills. Open to all majors, we pair technical work with professional development, social events, and community service, helping members land internships and advance their careers.",
            image: imageIEEE,
            link: "https://ieee.cecs.ucf.edu/",
        },
        {
            title: "Knight Hacks",
            description: "Knight Hacks is UCF\'s largest student-run software development org, offering weekly workshops, coding nights, and an annual 36-hour hackathon for hands-on building and networking. We provide year-round mentorship, industry partnerships, and leadership opportunities to support developers at every skill level.",
            image: imageKnightHacks,
            link: "https://blade.knighthacks.org/",
        },
        {
            title: "Blue Origin",
            description: "Coming soon...",
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
            <div className = "text-amber-50 pt-6 text-center font-serif justify-center w-2/3 items-center m-auto mb-8">
                These contributors are ACM, AI@UCF, IEEE, KnightHacks, and BlueOrigin. They have been instrumental in the development of the Autonomous Drone Project, providing envaluable support and expertise. Each ... has played a crucial role in shaping the project, from ... to ... . Their contributions have been vital to advancing the project and ensuring its success. We are grateful for their dedication and hard work, which have helped us achieve our goals and push the boundaries of what is possible with autonomous drone technology.
            </div>

            {/* Card Grid */}
            <div className= "flex flex-col items-center gap-8 pt-1 px-6 sm:px-4 lg:px-8 space-y-1">
                <div className = "grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {cards.slice(0, 3).map((card) => (
                        <Link
                            href= {card.link}
                            key= {card.title}
                            className= "block transform hover:-translate-y-1 transition"
                        >
                            <ContributorsCard {...card} />
                        </Link>
                    ))}
                </div>

                {/* Bottom row of 2 cards cenetered in a 2-column grid */}
                <div className = "grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
                    {cards.slice(3).map((card) => (
                        <Link
                            href = {card.link}
                            key = {card.title}
                            className = "block transform hover:-translate-y-1 transition"
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