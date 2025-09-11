// app/devlogs/page.tsx
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
          Explore progress and milestones from each team contributing to Kestrel at UCF.
          Choose a team below to dive into its development updates.
        </p>
      </section>

      {/* Team tiles */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_KEYS.map((teamKey) => {
            const meta = TEAM_META[teamKey];
            return (
              <TeamTile
                key={teamKey}
                title={meta.title}
                blurb={meta.blurb}
                href={`/devlogs/${meta.slug}`}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
