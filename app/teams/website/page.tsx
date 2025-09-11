// app/teams/leadership/page.tsx
import React from "react";
import MemberCard from "../_components/MemberCard";
import members from "./members";

export default function LeadershipTeamPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Kestrel’s Website Team
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Coordinating schedules, priorities, and integration across hardware,
          embedded, modeling, simulation, pathing, and web—so Kestrel ships as one.
        </p>
      </section>

      {/* Highlighted Devlogs (optional / placeholder) */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-semibold">Highlighted Devlogs</h2>
        <p className="mt-2 text-gray-400">
          No highlights yet for this team. Check the{" "}
          <a href="/devlogs" className="underline text-blue-300 hover:text-blue-200">
            Devlogs
          </a>{" "}
          page for updates.
        </p>
        {/* If you later want tiles here, mirror the Devlogs TeamTile style */}
      </section>

      {/* Team Members */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </main>
  );
}
