import Comment from "@/model/comment";
import { addCommentSchema } from "@/schema/addCommentSchema";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    const isValidCommentData = addCommentSchema.safeParse(body);

    if (!isValidCommentData) {
      return NextResponse.json(
        { message: "Invalid comment data", success: false },
        { status: 400 }
      );
    }

    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId, name } = payload?.payload;
    const { content, blogId } = body;

    const comment = await Comment.create({
      userId: userId,
      blogId: blogId,
      content: content,
      createdBy: name,
      createdAt: new Date(),
    });
    const createdComment = await comment.save();

    return NextResponse.json(
      { message: "Comment Added", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
