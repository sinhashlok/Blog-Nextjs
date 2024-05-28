/* eslint-disable @next/next/no-img-element */
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

const Homepage = () => {
  return (
      <div>
        <Nav />
        <div className="w-full absolute -z-10">
          <img
            className="w-full h-[800px] blur-md"
            src="/assets/heroImg.jpg"
            alt="heor-img"
          />
        </div>
        <Hero />
      </div>
  );
};

export default Homepage;
