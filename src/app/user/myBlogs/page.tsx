import BlogsCard from "@/components/BlogsCard";
import { cookies } from "next/headers";

async function getMyBlogs() {
  const cookie = cookies().toString();
  const res = await fetch(`${process.env.DOMAIN}/api/blog/myBlogs`, {
    next: { revalidate: 0 },
    headers: { Cookie: cookie },
  })
    .then(async (res: any) => {
      const data = await res.json();
      console.log(data);
      return data.blogs;
    })
    .catch((error: any) => {
      console.log(error);
    });

  return res;
}

export default async function MyBlogs() {
  interface Blogs {
    _id: string;
    userId: string;
    title: string;
    content: string;
    coverImgURL: string;
    createdBy: string;
    createdAt: Date;
  }
  const myBlogs: Blogs[] = await getMyBlogs();

  return (
    <div className="mt-10">
      <h1 className="text-2xl mb-5">My Blogs</h1>
      <BlogsCard blogs={myBlogs} />
    </div>
  );
}
