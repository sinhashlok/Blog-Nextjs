"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface comments {
  content: string;
  createdAt: Date;
  createdBy: string;
  id: string;
}
const Comments = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [comments, setComments] = useState<comments[]>();
  const [addComment, setAddComment] = useState<string>();
  const [blogId, setBlogId] = useState<string>();

  const getBlog = async (id: string) => {
    try {
      const res = await fetch("/api/comment/getComments", {
        method: "POST",
        body: JSON.stringify({ blogId: id }),
      });
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
    setAddComment("");
  };

  useEffect(() => {
    const id = pathname.split("/")[2] || "";
    setBlogId(id);
    getBlog(id);
  }, []);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/comment/addComment", {
        method: "POST",
        body: JSON.stringify({
          content: addComment,
          blogId: blogId,
        }),
      });
      const data = await res.json();
      console.log(data);
      toast.success("Comment added");
      router.refresh();
    } catch (error) {}
  };
  return (
    <div>
      <h1 className="font-bold text-2xl">Comments</h1>
      <div className="mt-2 mb-6 flex flex-col">
        <input
          placeholder="Add comment"
          className="my-2 outline-none border-b-2 border-gray-300"
          onChange={(e: any) => setAddComment(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md text-sm text-white bg-green-400 px-4 py-2 w-[150px]"
          onClick={handleClick}
        >
          Add Comment
        </button>
      </div>
      <div>
        {comments?.map((comment) => (
          <div key={comment.id} className="my-2 border-b-2 py-2 flex flex-row items-center">
            <div className="mr-2">
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="text-lg font-semibold">{comment.createdBy}</div>
              <div className=" ">{comment.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
