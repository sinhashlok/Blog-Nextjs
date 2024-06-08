import Comment from "@/model/comment";
import { addCommentSchema } from "@/schema/addCommentSchema";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { blogId } = body;

    const comment = await Comment.find({ blogId: blogId }).select("-userId -blogId");

    return NextResponse.json(
      { message: "Comments found", success: true, comments: comment },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
