import Blog from "@/model/blog";
import User from "@/model/user";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const userId = payload?.payload?.userId;

    const user = await User.findById(userId);
    const blogId = user?.myBlogs;

    if (!blogId) {
      return NextResponse.json(
        { message: "No blogs", success: true, blog: null },
        { status: 200 }
      );
    }

    const blogs = await Promise.all(
      blogId.map(async (id) => {
        return await Blog.findById(id);
      })
    );

    return NextResponse.json(
      { message: "Found my blogs", success: true, blogs: blogs },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
