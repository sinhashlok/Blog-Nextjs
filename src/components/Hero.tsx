import Image from "next/image";
import { Ubuntu_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { data } from "@/utils/heroData";

export const roboto_mono = Ubuntu_Mono({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const Hero: React.FC = () => {
  return (
    <main className="mt-72 mx-6 md:mx-20 lg:mx-40">
      <div className="my-auto md:w-[60%] text-center md:text-left mx-auto text-white">
        <h1 className="text-xl">
          <span className={`${roboto_mono.className} text-5xl `}>
            Empower Your Tech Journey
          </span>
          <br /> Insights, Tutorials, and Stories for Developers and Innovators
        </h1>
        <br />
        <h2 className="text-xl mb-4">
          Dive into a treasure trove of expert insights, cutting-edge tutorials,
          and captivating stories curated just for you, the intrepid developer,
          coder, and tech aficionado.
        </h2>
        <Link href="/login">
          <Button variant="outline">Get Started</Button>
        </Link>
      </div>
      <div className="mt-96 w-[556px] mx-auto">
        <Card className="bg-white p-7">
          <CardHeader>
            <CardTitle className="leading-normal">
              Starting my blogging journey was a challenge. The first posts were
              a mess - too long, too short, too boring... But with dedication
              and practice, I found my voice and style.
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <p className="ml-auto">- A blogger</p>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-40 mb-40 w-[60%] mx-auto">
        <h1 className="text-3xl text-center mb-10">
          <span className="text-7xl italic">Rules</span>
          <br />
          for a <span className="underline">great blog</span>
        </h1>
        {data?.map((item: any) => (
          <Accordion type="single" key={item.id} collapsible>
            <AccordionItem value="item-1" className="my-2">
              <AccordionTrigger className="text-xl">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-lg w-[90%]">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <div className="mt-40 mb-40 w-[60%] mx-auto">
        <h1 className="text-3xl text-center mb-10">
          <span className="text-7xl italic">About</span>
          <br />
          the <span className="underline">author</span>
        </h1>
        <div className="mx-auto">
          <Card className="p-7 leading-normal">
            <CardHeader>
              <CardDescription>Hi, I am</CardDescription>
              <CardTitle>Shlok Sinha 👋</CardTitle>
            </CardHeader>
            <CardContent>
              I designed🎨 and developed🛠️ this website.
              <br /> Well I may have take some inspiration for design from some
              AI tools, but the code part was all in all mine.
              <br /> Thank you for visiting this site. Now go, lets write some
              techincal shit and post it as blog.
            </CardContent>
            <CardFooter>
              <Button className="mr-2">Want to know me??</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Hero;
