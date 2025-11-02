import React from "react";
import TeamTile from "./_components/TeamTile";
import { TEAM_META, TEAM_KEYS } from "@/lib/devlogs";

export const dynamic = "force-dynamic";

export default async function DevlogsLandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero / Intro */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Kestrel Devlogs
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Explore progress and milestones from each team contributing to Kestrel.
        </p>
      </section>

      {/* Team tiles */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* Top row - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center mb-10">
          {TEAM_KEYS.slice(0, 4).map((teamKey) => {
            const meta = TEAM_META[teamKey];
            return (
              <div key={teamKey} className="w-full max-w-[320px]">
                <TeamTile
                  title={meta.title}
                  blurb={meta.blurb}
                  href={`/devlogs/${meta.slug}`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom row - centered manually */}
        <div className="flex justify-center gap-6 flex-wrap">
          {TEAM_KEYS.slice(4).map((teamKey) => {
            const meta = TEAM_META[teamKey];
            return (
              <div key={teamKey} className="max-w-[320px]">
                <TeamTile
                  title={meta.title}
                  blurb={meta.blurb}
                  href={`/devlogs/${meta.slug}`}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
