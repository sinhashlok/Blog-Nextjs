"use client";
import BlogsCard from "@/components/BlogsCard";
import { CardSkeleton } from "@/components/skeletons";
import { useEffect, useState } from "react";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export default function Dashboard() {
  noStore();
  interface Blogs {
    _id: string;
    userId: string;
    title: string;
    content: string;
    coverImgURL: string;
    createdBy: string;
    createdAt: Date;
  }
  const [allBlogs, setAllBlogs] = useState<Blogs[]>();

  async function getAllBlogs() {
    noStore();
    const res = await fetch("/api/blog/allBlogs", {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify({ blog: allBlogs }),
    })
      .then(async (res) => {
        const data = await res.json();
        return data.blogs;
      })
      .catch((err) => {
        console.log(err);
      });
    setAllBlogs(res);
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-5 text-center">Blogs</h1>
      {allBlogs ? (
        <BlogsCard blogs={allBlogs} />
      ) : (
        <div className="mt-14 flex flex-col items-center md:flex-row gap-x-12 gap-y-12 flex-wrap">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
    </div>
  );
}
