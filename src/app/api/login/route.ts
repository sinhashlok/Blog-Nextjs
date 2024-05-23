import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/dbConnect";
import User from "@/model/user";
import { loginSchema } from "@/schema/loginSchema";
import bcryptjs from "bcryptjs";
import jose from "jose";
import { createJwtToken } from "@/utils/jwtToken";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Zod validation
    const isValidSignUpData = loginSchema.safeParse(body);
    if (!isValidSignUpData) {
      return NextResponse.json(
        { message: "Invalid Input", success: false },
        { status: 400 }
      );
    }

    const { fullname, username, email, password } = body;
    const user = await User.findOne({ username: username });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { message: "No such user exists", success: false },
        { status: 400 }
      );
    }

    // Password verify
    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 400 }
      );
    }

    // User verified before signing
    if (!user.isVerified) {
      return NextResponse.json(
        { message: "User not verified", success: false },
        { status: 400 }
      );
    }

    const token = await createJwtToken(user._id, user.fullname);

    const res = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );
    res.cookies.set("token", token);
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
