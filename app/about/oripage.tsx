import arduinoBoard from "@/public/ArduinoBoard.png";
import imageTeam from "@/public/GroupSample.jpg";
import neuralNetwork from "@/public/NeuralNetwork.jpg";
import research from "@/public/Research.png";
import Image from "next/image";
import AboutCard, { AboutCardProps } from "./_components/AboutCard";

const AboutPage = () => {
  const cards: AboutCardProps[] = [
    {
      title: "Hardware Team",
      description: `Ensures Kestrel's stability by developing custom electronics that integrate with software systems. 
      They're building a VL53L1X ToF sensor array to generate region-specific data for heat maps and collecting hardware metrics like weight distribution to support dynamic piloting. 
      Their next goal is enabling real-time responsiveness—feeding structured sensor and path data into Ardu-Pilot so the drone can follow routes, avoid obstacles, and track targets through coordinated control.`,
      image: arduinoBoard,
    },
    {
      title: "Software Team",
      description: `Powers Kestrel’s intelligence by integrating machine learning and autonomous flight logic. 
      They use real-time ToF sensor data to build heat maps for environmental awareness and refine tracking models for accurate in-flight identification. 
      They're also improving navigation with geodesic distance and Ricci flow algorithms, while developing base station logic to manage commands like takeoff and landing for smooth operator control.`,
      image: neuralNetwork,
    },
    {
      title: "Research",
      description: `Our research focuses on object tracking, deep learning, obstacle
              avoidance, and flight path optimization. By experimenting with
              neural networks and decision-making algorithms, we aim to improve
              Kestrel's ability to fly autonomously in dynamic environments.
              This includes navigating complex spaces, adapting to unseen
              obstacles, and making real-time decisions without human input.`,
      image: research,
    },
  ];

  return (
    <div className="h-fit w-full bg-gradient-to-t from-slate-700 to-slate-900">
      <div className="pt-[80px] text-5xl font-bold text-center text-neutral-200 font-mono">
        About Kestrel
      </div>
      <div className="text-amber-50 pt-6 text-center font-serif justify-center w-2/3 items-center m-auto">
        Kestrel is an autonomous videography drone initiative developed by
        student teams within several student ran clubs at UCF. Kestrel&apos;s
        focus is on pushing the boundaries of aerial robotics while integrating
        the intelligence of modern day computing systems. The project combines
        expertise from both hardware and software disciplines to design, build,
        and program drones capable of intelligent flight. Whether it&apos;s
        object detection, pathfinding, or dynamic control, Kestrel aims to
        provide a comprehensive platform for learning, research, and innovation
        in autonomous systems.
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-row gap-20 justify-center pt-8 max-w-5xl">
          {cards.map((card) => (
            <AboutCard {...card} key={card.title} />
          ))}
        </div>
      </div>

      <section className="pt-10 w-full">
        <div className="flex w-full">
          <div className="absolute flex justify-center pt-5 w-full">
            <h1 className="text-5xl font-serif font-bold text-amber-100">
              The Team
            </h1>
          </div>
          <div className="w-full flex justify-center items-center">
            <Image src={imageTeam} alt={""} className="w-5xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
