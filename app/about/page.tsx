import arduinoBoard from "@/public/ArduinoBoard.png";
import imageTeam from "@/public/GroupSample.jpg";
import neuralNetwork from "@/public/NeuralNetwork.jpg";
import research from "@/public/Research.png";
import Image from "next/image";
import AboutCard, { AboutCardProps } from "./_components/AboutCard";

const AboutPage = () => {
  const cards: AboutCardProps[] = [
    {
      title: "Pathing Team",
      description: `Responsible for the creation of the pathing nodes (Research, Theory, Implementation) as well as the integration of the pathing nodes into the system as a whole.
`,
      image: neuralNetwork, 
    },
    {
      title: "Embedded Team",
      description: `Responsible for enabling autonomous drone navigation by integrating hardware and sensor systems to ensure real-time control, obstacle avoidance, and dynamic target tracking.
`,
      image: arduinoBoard,
    },
    {
      title: "Model Team",
      description: `Responsible for the AI and object tracking portion of the project and implementing a deep learning model called DeepSORT, which will allow the drone to accurately track and follow PEV riders over time.
`,
      image: research,
    },
    {
      title: "Simulation Team",
      description: `Backbone of the project and provides insight and deeper knowledge into the methods being developed. Lays the foundation for the embedded team, who will use that work to develop interface modules for the real hardware.`,
      image: neuralNetwork,
    },
    {
      title: "Hardware Team",
      description: `The Hardware section of the Kestrel project deals with the physical demands of the UAV. Items such as propellers, sensors, power, mounting and speed. Hardware needs to work closely with the other sections of the project because the vehicle and its components are the foundation the other sections build off of and branch out.`,
      image: arduinoBoard,
    },
    {
      title: "Website Team",
      description: `Builds and maintains Kestrel’s web platform to showcase team progress, updates, and documentation.`,
      image: imageTeam,
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
        
<div className="flex flex-col items-center gap-8 pt-10">
  
  
  <div className="flex flex-row justify-center flex-wrap gap-10 w-full max-w-6xl">
    {cards.slice(0, 3).map((card) => (
      <AboutCard {...card} key={card.title} />
    ))}
  </div>

  
  <div className="flex flex-row justify-center flex-wrap gap-10 w-full max-w-6xl">
    {cards.slice(3, 6).map((card) => (
      <AboutCard {...card} key={card.title} />
    ))}
  </div>

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
