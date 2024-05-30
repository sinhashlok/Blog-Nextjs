"use client";
import { useEffect, useState } from "react";
import BlogsCard from "@/components/BlogsCard";

const Dashboard = () => {
  interface Blogs {
    _id: string;
    userId: string;
    title: string;
    content: string;
    coverImgURL: string;
    createdBy: string;
    createdAt: Date;
  }
  const [allBlogs, setAllBlogs] = useState<[Blogs]>();
  async function getAllBlogs() {
    const res = await fetch("/api/blog/allBlogs", {
      cache: "no-cache",
      next: { revalidate: 10 },
    })
      .then(async (res: any) => {
        const data = await res.json();
        return data.blogs;
      })
      .catch((error: any) => {
        console.log(error);
      });

    if (res) {
      setAllBlogs(res);
    }

    return res;
  }
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-5 text-center">Blogs</h1>
      <BlogsCard blogs={allBlogs} />
    </div>
  );
};

export default Dashboard;
