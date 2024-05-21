import Image from "next/image";
import { Ubuntu_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";

export const roboto_mono = Ubuntu_Mono({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <main className="mt-20 flex flex-row justify-between">
      <div className="my-auto">
        <h1 className="text-lg">
          <span className={`${roboto_mono.className} text-4xl `}>
            Empower Your Tech Journey
          </span>
          <br /> Insights, Tutorials, and Stories for Developers and Innovators
        </h1>
        <br />
        <h2 className="text-lg mb-4">
          Dive into a treasure trove of expert insights, cutting-edge tutorials,
          and captivating stories curated just for you, the intrepid developer,
          coder, and tech aficionado.
        </h2>
        <Button variant="teal">Log in</Button>
      </div>
      <Image src="/assets/hero.svg" width={700} height={700} alt="hero-log" />
    </main>
  );
};

export default Hero;
