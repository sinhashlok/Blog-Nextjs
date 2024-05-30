import Blog from "@/model/blog";
import { blogIdSchema } from "@/schema/blogIdSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isValidData = blogIdSchema.safeParse(body);
    if (!isValidData) {
      return NextResponse.json(
        { message: "Invalid Input", success: false },
        { status: 404 }
      );
    }

    const blogId = body.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json(
        { message: "Error getting blog", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog found", success: true, blog: blog },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 404 }
    );
  }
}
