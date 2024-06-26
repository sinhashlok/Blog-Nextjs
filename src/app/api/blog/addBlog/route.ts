import Blog from "@/model/blog";
import User from "@/model/user";
import { addBlogSchema } from "@/schema/addBlogSchema";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isValidBlogData = addBlogSchema.safeParse(body);

    if (!isValidBlogData) {
      return NextResponse.json(
        { message: "Invalid input", success: false },
        { status: 400 }
      );
    }

    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId, name } = payload?.payload;
    const { title, content, coverImgURL } = body;

    const blog = await Blog.create({
      userId: userId,
      title: title,
      content: content,
      coverImgURL: coverImgURL || "",
      createdBy: name,
      createdAt: new Date(),
    });

    await blog.save();

    return NextResponse.json(
      { message: "Blog added successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
