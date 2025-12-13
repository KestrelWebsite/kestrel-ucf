import React from "react";
import placeholder from "@/public/ArduinoBoard.png";
import TeamCard from "./_components/TeamCard";
import { supabase } from "@/lib/supabaseClient";
import type { Team } from "@/types/supabase";

export const revalidate = 0;

export default async function TeamsPage() {
  const { data: teamsData, error } = await supabase.from("teams").select("*");

  if (error) {
    console.error("Error fetching teams:", error.message);
  }

  const progressMap = (teamsData ?? []).reduce((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {} as Record<number, Team>);

  const cards = [
    {
      id: 999,
      title: "Leadership",
      description: "Team Leads and Program Leadership",
      image: placeholder,
      link: "/teams/leadership",
    },
    {
      id: 1,
      title: "Hardware",
      description: "Propulsion systems, structural integration.",
      image: placeholder,
      link: "/teams/hardware",
    },
    {
      id: 2,
      title: "Embedded",
      description: "Firmware, I/O, control loops, firmware, I/O .X",
      image: placeholder,
      link: "/teams/embedded",
    },
    {
      id: 3,
      title: "Model",
      description: "Algorithm optimization, motion prediction.",
      image: placeholder,
      link: "/teams/model",
    },
    {
      id: 4,
      title: "Simulation",
      description: "System integration, autonomous verification.",
      image: placeholder,
      link: "/teams/simulation",
    },
    {
      id: 5,
      title: "Pathing",
      description: "Planning, navigation, logic, navigation, logic.X",
      image: placeholder,
      link: "/teams/pathing",
    },
    {
      id: 6,
      title: "Website",
      description: "Performance optimization, interactive design.",
      image: placeholder,
      link: "/teams/website",
    },
    {
      id: 7,
      title: "Aerostructures",
      description: "Structural design, aerodynamic efficiency.X",
      image: placeholder,
      link: "/teams/aerostructures",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Kestrel Teams
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Discover the purpose, leadership, and innovations driving each Kestrel team.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 flex flex-col items-center">

        {/* Leadership Row */}
        <div className="grid grid-cols-1 gap-8 justify-items-center mb-12">
          <div className="w-full max-w-[320px] h-full flex justify-center">
            <TeamCard
              title={cards[0].title}
              description={cards[0].description}
              image={cards[0].image}
              link={cards[0].link}
              status={progressMap[999]?.status}
              launchReadiness={progressMap[999]?.launch_readiness}
              step4Objectives={progressMap[999]?.step4_objectives ?? []}
            />
          </div>
        </div>

        {/* First row of 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {cards.slice(1, 5).map((card) => {
            const progress = progressMap[card.id] || {};
            return (
              <div
                key={card.id}
                className="w-full max-w-[320px] h-full flex justify-center"
              >
                <TeamCard
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  link={card.link}
                  status={progress.status ?? undefined}
                  launchReadiness={progress.launch_readiness ?? undefined}
                  step4Objectives={progress.step4_objectives ?? []}
                />
              </div>
            );
          })}
        </div>

        {/* Second row of 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-10">
          {cards.slice(5).map((card) => {
            const progress = progressMap[card.id] || {};
            return (
              <div
                key={card.id}
                className="w-full max-w-[320px] h-full flex justify-center"
              >
                <TeamCard
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  link={card.link}
                  status={progress.status ?? undefined}
                  launchReadiness={progress.launch_readiness ?? undefined}
                  step4Objectives={progress.step4_objectives ?? []}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
