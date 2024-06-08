import Blog from "@/model/blog";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies?.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const userId = payload?.payload?.userId;

    const blogs = await Blog.find({ userId: userId });

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
