"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import MemberCard from "../_components/MemberCard";
import { supabase } from "@/lib/supabaseClient";

const TEAM_META = {
  hardware: {
    id: 1,
    title: "Kestrel’s Hardware Team",
    description:
      "The Hardware Team builds the physical foundation of the Kestrel UAV—integrating propulsion, power, sensors, and structure to form the stable platform that supports all other systems.",
  },
  embedded: {
    id: 2,
    title: "Kestrel’s Embedded Team",
    description:
      "Firmware, I/O, control loops, and communication—powering the intelligence inside Kestrel.X",
  },
  model: {
    id: 3,
    title: "Kestrel’s Model Team",
    description:
      "The Model Team develops Kestrel’s AI-driven tracking system, integrating object detection, motion prediction, and identity re-identification to enable precise, real-time rider following.",
  },
  simulation: {
    id: 4,
    title: "Kestrel’s Simulation Team",
    description:
      "The Simulation Team designs and integrates high-fidelity virtual environments to rigorously test and validate Kestrel’s autonomous systems before real-world deployment.",
  },
  pathing: {
    id: 5,
    title: "Kestrel’s Pathing Team",
    description:
      "Navigation, obstacle avoidance, and decision logic—charting Kestrel’s flight paths safely and efficiently.X",
  },
  website: {
    id: 6,
    title: "Kestrel’s Website Team",
    description:
      "The Website Team transforms Kestrel’s engineering and research into an interactive, visually compelling platform that bridges innovation and visibility through cutting-edge web technologies and real-time integration.",
  },
  aerostructures: {
    id: 7,
    title: "Kestrel’s Aerostructures Team",
    description:
      "Designing and analyzing the structural framework of the Kestrel drone, ensuring strength, efficiency, and aerodynamic performance in every component.X",
  },
};

export default function TeamPage() {
  const params = useParams();
  const teamSlug = (params?.team as string)?.toLowerCase();
  const teamInfo = TEAM_META[teamSlug as keyof typeof TEAM_META];

  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch team members from Supabase
  useEffect(() => {
    if (!teamInfo) return;

    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("id, name, role, major, contribution, linkedin_url, github_url")
        .eq("team_id", teamInfo.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching team members:", error);
      } else {
        setMembers(data ?? []);
      }
      setLoading(false);
    };

    fetchMembers();
  }, [teamInfo]);

  if (!teamInfo) return notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      {/*Header Section*/}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {teamInfo.title}
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          {teamInfo.description}
        </p>
      </section>

      {/*Team Members Section*/}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold">Team Members</h2>

        {loading ? (
          <p className="mt-6 text-gray-400">Loading team members...</p>
        ) : members.length === 0 ? (
          <p className="mt-6 text-gray-400">No team members yet for this team.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                name={member.name}
                role={member.role}
                major={member.major}
                contribution={member.contribution}
                links={[
                  ...(member.linkedin_url
                    ? [{ type: "linkedin", href: member.linkedin_url }]
                    : []),
                  ...(member.github_url
                    ? [{ type: "github", href: member.github_url }]
                    : []),
                ]}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
