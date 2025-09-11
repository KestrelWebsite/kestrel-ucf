import React from "react";
import MemberCard from "../_components/MemberCard";
import members from "./embeddedMembers.json";

export default function EmbeddedTeamPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Kestrel’s Embedded Team
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Coordinating schedules, priorities, and integration across hardware,
          embedded, modeling, simulation, pathing, and web—so Kestrel ships as one.
        </p>
      </section>

      {/* Team Members */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.Embedded.map((member) => (
            <MemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              major={member.major}
              contribution={member.contribution}
              image={member.image}
              links={member.links}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
