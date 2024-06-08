"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Ubuntu_Mono } from "next/font/google";
import Comments from "@/components/Comments";

const roboto_mono = Ubuntu_Mono({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const BlogId = () => {
  interface Blogs {
    _id: string;
    userId: string;
    title: string;
    content: string;
    coverImgURL: string;
    createdBy: string;
    createdAt: Date;
  }
  const pathname = usePathname();
  const [blog, setBlog] = useState<Blogs>();
  async function getBlog(blogId: string) {
    const res = await fetch("/api/blog/getBlog", {
      cache: "force-cache",
      next: { revalidate: 60 },
      method: "POST",
      body: JSON.stringify({ blogId }),
    })
      .then(async (res: any) => {
        const data = await res.json();
        return data.blog;
      })
      .catch((error: any) => {
        console.log(error);
      });

    if (res) {
      setBlog(res);
    }

    return res;
  }
  useEffect(() => {
    const blogId = pathname.split("/")[2];
    getBlog(blogId);
  }, []);

  return (
    <div className="mt-4 md:w-[60%] mx-auto">
      {blog && (
        <div>
          <Image
            src={blog.coverImgURL}
            alt="coverImg"
            width={400}
            height={100}
            className="mx-auto"
          />
          <div className="mt-10">
            <h1 className={`${roboto_mono.className} text-3xl`}>
              {blog.title}
            </h1>
            <h2 className="font-bold text-lg">by {blog.createdBy}</h2>
          </div>
          <div className="mt-5">
            <p className="leading-normal">{blog.content}</p>
          </div>
        </div>
      )}
      <div className="mt-10">
        <Comments />
      </div>
    </div>
  );
};

export default BlogId;
