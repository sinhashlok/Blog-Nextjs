import User from "@/model/user";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies?.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const userId = payload?.payload?.userId;

    const body = await req.json();
    const { fullname, username, password } = body;

    const user = await User.findById(userId);

    const verifyPassword = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (verifyPassword) {
      await User.findByIdAndUpdate(userId, {
        fullname: fullname,
        username: username,
      });
    } else {
      return NextResponse.json(
        {
          message: "Incorrect Password",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "User found & Updated",
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
