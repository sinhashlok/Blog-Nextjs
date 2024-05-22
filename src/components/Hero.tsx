import Image from "next/image";
import { Ubuntu_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const roboto_mono = Ubuntu_Mono({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <main className="mt-20 flex flex-row justify-between">
      <div className="my-auto md:w-[75%] text-center md:text-left">
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
        <Link href="/login">
          <Button variant="teal">Log in</Button>
        </Link>
      </div>
      <div className="hidden lg:flex">
        <Image src="/assets/hero.svg" width={700} height={700} alt="hero-log" />
      </div>
    </main>
  );
};

export default Hero;
