import Blog from "@/model/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await Blog.find({});
    console.log("all", blogs);

    return NextResponse.json(
      { message: "Found all blogs", success: true, blogs: blogs },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
