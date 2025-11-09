"use client";

export default function TeamsSection() {
  const teams = [
    { name: "Embedded" },
    { name: "Hardware" },
    { name: "Website" },
    { name: "Pathing" },
    { name: "Model" },
    { name: "Simulation" },
    { name: "Aerostructures" },
  ];

  return (
    <section
      id="teams"
      className="relative w-full z-[10] py-24 overflow-hidden text-white"
    >
      <h1 className="text-5xl font-semibold text-center mb-14">Our Teams</h1>

      {/* Main Container */}
      <div className="relative flex flex-wrap justify-center gap-6 px-6 md:justify-between md:gap-16">
        {/* Team Cards */}
        {teams.map((team, idx) => (
          <div
            key={idx}
            className="w-[45%] md:w-60 group flex flex-col items-center text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl py-4 md:py-6 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/10"
          >
            <h3 className="text-sm md:text-lg font-semibold text-white tracking-wide font-['Fira_Code',_monospace] group-hover:text-blue-400 transition">
              {team.name}
            </h3>
          </div>
        ))}

        {/* Soft glow behind */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-radial from-white/5 via-transparent to-transparent blur-[120px]"></div>
        </div>
      </div>
    </section>
  );
}
