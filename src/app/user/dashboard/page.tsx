"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
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
    const res = await axios
      .get("/api/blog/allBlogs")
      .then((res: AxiosResponse) => {
        return res.data.blogs;
      })
      .catch((err: AxiosError) => {
        console.log(err);
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
    <div className="mt-10">
      <h1 className="text-2xl mb-5 text-center">Blogs</h1>
      <BlogsCard blogs={allBlogs} />
    </div>
  );
};

export default Dashboard;
