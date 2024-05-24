import User from "@/model/user";
import { bookmarkBlogSchema } from "@/schema/bookmarkBlogSchema";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isValidBlogId = bookmarkBlogSchema.safeParse(body);

    if (!isValidBlogId) {
      return NextResponse.json(
        { message: "Invalid input", success: false },
        { status: 400 }
      );
    }

    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId } = payload?.payload;
    const { blogId } = body;

    await User.findByIdAndUpdate(userId, {
      $push: {
        bookmarkedBlogs: blogId,
      },
    });

    return NextResponse.json(
      { message: "Blog bookmarked successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
