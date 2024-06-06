import { cookies } from "next/headers";
import MyBlogs from "../myBlogs/page";
import UpdateProfile from "@/components/UpdateProfile";
import { Button } from "@/components/ui/button";
import DeleteAccount from "@/components/DeleteAccount";

async function getUser() {
  try {
    const res = await fetch(`${process.env.DOMAIN}/api/user/getUser`, {
      cache: "no-store",
      headers: { Cookie: cookies().toString() },
    });
    const data = await res.json();
    return data.user;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

interface User {
  _id: string;
  fullname: string;
  username: string;
  myBlogs: [];
  __v: 0;
}

export default async function Profile() {
  const user: User = await getUser();

  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="text-lg text-center">
        Hi, <span className="text-2xl font-black">{user.fullname}</span>
        <br />
        You have {user.myBlogs.length} blogs
      </div>
      <div className="mt-14 w-full">
        <UpdateProfile user={user} />
      </div>
      <div className="mt-14 text-center">
        <DeleteAccount />
      </div>
    </div>
  );
}
