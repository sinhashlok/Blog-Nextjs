import { Ubuntu_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileIcon } from "./ProfileIcon";
import AddBlog from "./AddBlog";

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

const NavLoggedIn = () => {
  return (
    <nav className="py-4 flex flex-row justify-between items-center">
      <Link href="/user/dashboard">
        <h1
          className={`${roboto_mono.className} text-2xl md:text-4xl`}
        >
          blog.me
        </h1>
      </Link>
      <div className={`flex flex-row items-center ${poppinsB.className}`}>
        <AddBlog />
        <ProfileIcon />
      </div>
    </nav>
  );
};

export default NavLoggedIn;
