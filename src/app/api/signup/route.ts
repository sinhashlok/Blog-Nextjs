import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/dbConnect";
import User from "@/model/user";
import { signupSchema } from "@/schema/signupSchema";
import bcryptjs from "bcryptjs";
import { sendEmailVerificationToken } from "@/utils/sendEmailVerificationToken";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Zod validation
    const isValidSignUpData = signupSchema.safeParse(body);
    if (!isValidSignUpData) {
      return NextResponse.json(
        { message: "Invalid Input", success: false },
        { status: 400 }
      );
    }

    const { fullname, username, email, password } = body;

    // Check if email or username already exists
    const userEmail = await User.findOne({ email: email });
    const userName = await User.findOne({ username: username });

    if (userEmail) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 409 }
      );
    } else if (userName) {
      return NextResponse.json(
        { message: "username already present", success: false },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user and add to Db
    const user = await User.create({
      fullname: fullname,
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    sendEmailVerificationToken({ email: email, userId: savedUser._id });

    return NextResponse.json(
      { message: "User created successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
