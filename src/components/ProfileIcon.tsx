"use client";

import { LogOut, Plus, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ProfileIcon() {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await axios
      .post("/api/logout")
      .then((res: AxiosResponse) => {
        toast.success(res.data.message, {duration: 6000});
        router.push("/login");
      })
      .catch((err: AxiosError) => {
        const data: any = err?.response?.data;
        toast.error(data?.message, {duration: 6000});
      });
  };
  return (
    <DropdownMenu>
      <Toaster />
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href="/user/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link href="/user/myBlogs">
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>My Blogs</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
