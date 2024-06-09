"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";

interface Blogs {
  _id: string;
  userId: string;
  title: string;
  content: string;
  coverImgURL: string;
  createdBy: string;
  createdAt: Date;
}

export default function BlogsCard({ blogs }: any) {
  const pathname = usePathname();
  const isMyBlog = pathname.includes("/myBlogs");
  const router = useRouter();
  const handleClick = (blogId: string) => {
    if (pathname.includes("/dashboard")) {
      return router.push(`${pathname.replace("/dashboard", "")}/${blogId}`);
    } else {
      return router.push(`${pathname.replace("/myBlogs", "")}/${blogId}`);
    }
  };
  const handleDeleteClick = async (blogId: string) => {
    await fetch("/api/blog/deleteBlog", {
      method: "POST",
      body: JSON.stringify({ blogId }),
    })
      .then(async (res) => {
        const data = await res.json();
        toast.success(data.message, {duration: 6000});
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        const data: any = error?.response?.data;
        toast.error(data?.message, {duration: 6000});
      });
  };
  return (
    <div className="flex flex-col items-center md:flex-row gap-x-12 gap-y-12 flex-wrap">
      <Toaster />
      {blogs?.map((data: Blogs) => {
        const date = new Date(data.createdAt);
        const created = date.toDateString();

        return (
          <div
            key={data._id}
            className={`${
              isMyBlog && "border-2 border-black rounded-md p-2 w-fit "
            }`}
          >
            <Card
              className="min-w-[300px] max-w-[300px] min-h-[250px] max-h-[400px] bg-black text-white cursor-pointer"
              onClick={() => handleClick(data._id)}
            >
              {data?.coverImgURL && (
                <img
                  src={data?.coverImgURL}
                  alt="coverImg"
                  className="w-[300px] min-h-[250px] max-h-[250px] absolute z-[0] rounded-sm blur-sm opacity-50"
                />
              )}
              <CardHeader className="relative z-[1]">
                <CardTitle>{data.title}</CardTitle>
                <CardDescription className="text-white">
                  {data.createdBy}
                </CardDescription>
              </CardHeader>
              <CardFooter className="relative z-[1] mt-24">
                <p className="ml-auto font-bold">- {created}</p>
              </CardFooter>
            </Card>
            <div className="flex justify-end">
              {isMyBlog && (
                <Button
                  className="mt-2"
                  variant="ghostModi"
                  onClick={() => handleDeleteClick(data._id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
