import Image, { StaticImageData } from "next/image";
import React from "react";
import imageSensors from "@/public/teams/sensors.jpg";
import imagePathing from "@/public/teams/pathing.jpg";
import imageArdupilot from "@/public/teams/ardupilot.jpg";
import imageModel from "@/public/teams/model.jpg";
import TeamCard, { TeamCardProps } from "./_components/TeamCard";
import Link from "next/link";

const TeamsPage = () => {
  const cards: TeamCardProps[] = [
    {
      title: "Sensor Team",
      description: 'The Sensor Team is currently developing the embedded system to operate the VL53L1X TOF sensor array. They are focusing on converting raw sensor data into a 3D mesh sensor calibration, optimizing ROI scanning, and ensuring robust data collection near drone propellers.',
      image: imageSensors,
      link: "/teams/sensors",
    },
    {
      title: "Pathing Team",
      description: 'The Pathing Team is testing three approaches, with a fourth being investigated: cruise control for target tracking, mesh-based path planning using sensor data, potential fields method, and geometric curving for dynamic obstacle avoidance. Each method enables the drone to navigate while maintaining optimal positioning relative to its environment and target.',
      image: imagePathing,
      link: "/teams/pathing",
    },
    {
      title: "ArduPilot Team",
      description:'The Simulation Team is using SITL to emulate the ArduPilot firmware and test flight logic, while Gazebo provides realistic sensor data to complete the closed-loop system. Together, they allow full validation of navigation algorithms in a fully simulated environment before real-world deployment.',
      image: imageArdupilot,
      link: "/teams/ardupilot",
    },
    {
      title: "Model Team",
      description: 'The Model team for Kestrel has implemented a SORT MOT model. This team is currently working on benchmarking this model as well as implementing the improved Deep-SORT model to increase tracking accuracy. Furthermore this team is finalizing there models with a custom dataset fit to the project scope.',
      image: imageModel,
      link: "/team/model",
    },
  ];

  return(
    <div className = "h-fit w-full bg-gradient-to-t from-slate-700 to-slate-900">
      {/* Heading */}
      <div className = "pt-[80px] text-5xl font-bold text-conter text-neutral-200 font-mon0 text-center">
        Meet the Teams
      </div>

      {/* Intro Description */}
      <div className = "text-amber-50 pt-6 text-center font-serif justify-center w-2/3 items-center m-auto">
        Kestrel is a collaborative project made possible by multiple specialized teams at UCF. ..., each team plays a critical role in building an autonomous drone capable of intelligent flight.
      </div>

      {/* Card Grid */}
      <div className = "w-full pt-10 px-4 sm:px-6 lg:px-8">
        <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <Link 
              href = {card.link}
              key = {card.title}
              className = "block transform hover:-translate-y-1 transition"
            >
              <TeamCard {...card} />
            </Link>
          ))}
        </div>
      </div>
      </div>
  );
};

export default TeamsPage;