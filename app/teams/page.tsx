import React from "react";
import placeholder from "@/public/ArduinoBoard.png";
import TeamCard from "./_components/TeamCard";
import { supabase } from "@/lib/supabaseClient";

export default async function TeamsPage() {
  const { data: teamsData, error } = await supabase.from("teams").select("*");

  if (error) {
    console.error("Error fetching teams:", error.message);
  }

  const progressMap = (teamsData ?? []).reduce((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {} as Record<number, any>);

  const cards = [
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
      description:
        "Structural design, aerodynamic efficiency.X",
      image: placeholder,
      link: "/teams/aerostructures",
    },
  ];

  const topRow = cards.slice(0, 4);
  const bottomRow = cards.slice(4);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Kestrel Teams
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Discover the purpose, leadership, and innovations driving each Kestrel team.
        </p>
      </section>

      {/* Cards Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* Unified grid for consistent card width & height */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            gap-10 
            justify-items-center 
            place-content-center
          "
        >
          {/* Top row (4 cards) */}
          {topRow.map((card) => {
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

          {/* Spacer row break (forces new line for next 3) */}
          <div className="col-span-full h-0" />

          {/* Bottom row (3 centered cards)*/}
          <div className="col-span-full flex justify-center gap-10 flex-wrap">
            {bottomRow.map((card) => {
              const progress = progressMap[card.id] || {};
              return (
                <div
                  key={card.id}
                  className="w-full sm:w-auto max-w-[320px] h-full flex justify-center"
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
        </div>
      </section>
    </main>
  );
}
