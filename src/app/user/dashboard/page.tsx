import BlogsCard from "@/components/BlogsCard";
import axios from "axios";

async function getAllBlogs() {
  const res = await fetch(`${process.env.DOMAIN}/api/blog/allBlogs`, {
    cache: "no-store",
  })
    .then(async (res: any) => {
      const data = await res.json();
      return data.blogs;
    })
    .catch((error: any) => {
      console.log(error);
    });

  return res;
}

export default async function Dashboard() {
  interface Blogs {
    _id: string;
    userId: string;
    title: string;
    content: string;
    coverImgURL: string;
    createdBy: string;
    createdAt: Date;
  }
  const allBlogs: Blogs[] = await getAllBlogs();

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-5 text-center">Blogs</h1>
      <BlogsCard blogs={allBlogs} />
    </div>
  );
}
