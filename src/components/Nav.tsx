import { Ubuntu_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const poppinsB = Poppins({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

export const roboto_mono = Ubuntu_Mono({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const Nav = () => {
  return (
    <nav className="py-4 flex flex-row justify-between">
      <h1 className={`${roboto_mono.className} text-4xl text-teal-400`}>
        blog.me
      </h1>
      <div className={`flex flex-row ${poppinsB.className}`}>
        <Button variant="ghost" className="mr-2">
          <Link href="/login">Log in</Link>
        </Button>
        <Button variant="ghost">
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
