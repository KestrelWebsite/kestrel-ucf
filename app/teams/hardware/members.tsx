import { MemberCardProps } from "../_components/MemberCard";
import placeholder from "@/public/ArduinoBoard.png";

// placeholder data

const members: MemberCardProps[] = [
    {
        name: "name1",
        role: "role",
        description: "Lorem ",
        image: placeholder,
        links: [
            {
                type: "cover_letter",
                href: "iorhgirhgi"
            },
            {
                type: "github",
                href: "https://github.com"
            }
        ]
    },
    {
        name: "name2",
        role: "role",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: placeholder,
        links: [
            {
                type: "linkedin",
                href: "https://linkedin.com"
            },
            {
                type: "resume",
                href: "resumeresume"
            },
            {
                type: "misc link",
                href: "uihiuhuihoihoihih"
            }
        ]
    },
];

export default members;