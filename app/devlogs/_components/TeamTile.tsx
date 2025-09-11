// app/devlogs/_components/TeamTile.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  title: string;
  blurb: string;
  href: string;
}

export default function TeamTile({ title, blurb, href }: Props) {
  return (
    <Link href={href} className="group">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-xl border border-white/10 bg-white/2 p-6 hover:border-white/20
                   backdrop-blur-sm shadow-sm hover:shadow-md transition-colors h-full flex flex-col justify-between"
      >
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-gray-300">{blurb}</p>
        </div>
        <div className="mt-6 text-sm text-blue-300 group-hover:text-blue-200">
          View {title} devlogs →
        </div>
      </motion.div>
    </Link>
  );
}
