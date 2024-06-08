import Blog from "@/model/blog";
import User from "@/model/user";
import { blogIdSchema } from "@/schema/blogIdSchema";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isValidid = blogIdSchema.safeParse(body);
    if (!isValidid) {
      return NextResponse.json(
        { message: "Invalid Id", success: false },
        { status: 400 }
      );
    }

    const blogId = body.blogId;
    const blog = await Blog.findByIdAndDelete(blogId);

    return NextResponse.json(
      { message: "Deleted Blog: " + blog?.title, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
