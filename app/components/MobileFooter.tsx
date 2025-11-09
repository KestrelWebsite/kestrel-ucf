"use client";

import Link from "next/link";

export default function MobileFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-black/60 backdrop-blur-lg text-gray-300 py-10 px-4 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-transparent to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-10 left-1/2 w-[300px] h-[200px] -translate-x-1/2 bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      {/* Intro text */}
      <p className="text-center text-gray-400 text-xs mb-8 relative z-10 max-w-sm mx-auto leading-relaxed">
        Developed by students at the University of Central Florida in
        collaboration with Blue Origin and affiliated UCF clubs.
      </p>

      {/* Footer sections side by side */}
      <div className="flex justify-center items-start gap-6 text-sm relative z-10 flex-wrap">
        {/* Media */}
        <div className="text-center w-[100px]">
          <h4 className="text-white font-semibold mb-3 text-base">Media</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.youtube.com/@ProjectKestrel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Autonomous-droneProject/Kestrel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="text-center w-[100px]">
          <h4 className="text-white font-semibold mb-3 text-base">About</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/#about" className="hover:text-white transition">
                Project
              </Link>
            </li>
            <li>
              <Link
                href="/#contributors"
                className="hover:text-white transition"
              >
                Contributors
              </Link>
            </li>
            <li>
              <Link href="/#journey" className="hover:text-white transition">
                More
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="text-center w-[100px]">
          <h4 className="text-white font-semibold mb-3 text-base">
            Resources
          </h4>
          <ul className="space-y-1">
            <li>
              <Link href="/devlogs" className="hover:text-white transition">
                Devlogs
              </Link>
            </li>
            <li>
              <a
                href="mailto:teamlead@example.com"
                className="hover:text-white transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-xs mt-10 relative z-10">
        © 2025 Kestrel UCF. All rights reserved.
      </p>
    </footer>
  );
}
