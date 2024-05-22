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
    <nav className="py-4 flex flex-row justify-between items-center">
      <Link href="/">
        <h1
          className={`${roboto_mono.className} text-2xl md:text-4xl text-teal-400`}
        >
          blog.me
        </h1>
      </Link>
      <div className={`flex flex-row ${poppinsB.className}`}>
        <Link href="/login">
          <Button variant="ghost" className="mr-2">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="ghost">Sign up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
