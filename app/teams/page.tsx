// app/teams/page.tsx
import React from "react";
import placeholder from "@/public/ArduinoBoard.png";
import TeamCard, { TeamCardProps } from "./_components/TeamCard";

const TeamsPage = () => {
  const leadershipCard: TeamCardProps = {
    title: "Leadership",
    description: "Project coordination, team direction.",
    image: placeholder,
    link: "/teams/leadership"
  };

  const cards: TeamCardProps[] = [
    {
      title: "Hardware",
      description: "Airframe, propulsion, integration.",
      image: placeholder,
      link: "/teams/hardware"
    },
    {
      title: "Embedded",
      description: "Firmware, I/O, control loops.",
      image: placeholder,
      link: "/teams/embedded"
    },
    {
      title: "Model",
      description: "3D design, CAD, rigging.",
      image: placeholder,
      link: "/teams/model"
    },
    {
      title: "Simulation",
      description: "Gazebo/ROS, test scenarios.",
      image: placeholder,
      link: "/teams/simulation"
    },
    {
      title: "Pathing",
      description: "Planning, navigation, logic.",
      image: placeholder,
      link: "/teams/pathing"
    },
    {
      title: "Website",
      description: "Frontend, dashboards.",
      image: placeholder,
      link: "/teams/website"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Our Teams
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Meet the groups building Kestrel—hardware, embedded control, modeling, simulation,
          pathing, website, and leadership.
        </p>
      </section>

      {/* Leadership card (on its own row, centered) */}
      <section className="max-w-4xl mx-auto px-6 pb-12 flex justify-center">
        <div className="w-full sm:w-2/3 lg:w-1/2">
          <TeamCard {...leadershipCard} />
        </div>
      </section>

      {/* Other cards grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card) => (
            <TeamCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default TeamsPage;
