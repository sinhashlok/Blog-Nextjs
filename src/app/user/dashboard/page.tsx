import BlogsCard from "@/components/BlogsCard";
import { cookies } from "next/headers";

async function getAllBlogs() {
  const cookie = cookies().toString();
  const res = await fetch(`${process.env.DOMAIN}/api/blog/allBlogs`, {
    next: { revalidate: 0 },
    headers: { Cookie: cookie },
  })
    .then(async (res) => {
      const data = await res.json();
      return data.blogs;
    })
    .catch((err) => {
      console.log(err);
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
