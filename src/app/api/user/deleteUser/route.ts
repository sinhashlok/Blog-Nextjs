import MyBlogs from "@/app/user/myBlogs/page";
import Blog from "@/model/blog";
import User from "@/model/user";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies?.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const userId = payload?.payload?.userId;

    const user = await User.findByIdAndDelete(userId);
    await Blog.deleteMany({ userId: userId });

    return NextResponse.json(
      {
        message: "User & Blogs deleted",
        success: true,
        user: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
