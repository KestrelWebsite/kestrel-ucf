import Pilot from "./components/Pilot/Pilot";

const HomePage = () => {
  return (
    <div className="h-full relative">
      <video
        muted
        loop
        autoPlay
        className="absolute w-full h-full object-cover z-20"
      >
        <source src="/droneshot.mp4" type="video/mp4" />
      </video>
      <section className="relative w-full h-full z-30 flex justify-center items-center">
        <Pilot />
      </section>
    </div>
  );
};

export default HomePage;