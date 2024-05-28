"use client";
import BlogsCard from "@/components/BlogsCard";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const MyBlogs = () => {
  interface Blogs {
    _id: string;
    userId: string;
    title: string;
    content: string;
    coverImgURL: string;
    createdBy: string;
    createdAt: Date;
  }
  const [myBlogs, setmyBlogs] = useState<[Blogs]>();
  async function getMyBlogs() {
    const res = await axios
      .post("/api/blog/myBlogs")
      .then((res: AxiosResponse) => {
        return res.data.blogs;
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });

    setmyBlogs(res);
    return res;
  }
  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-2xl mb-5">My Blogs</h1>
      <BlogsCard blogs={myBlogs} />
    </div>
  );
};

export default MyBlogs;
