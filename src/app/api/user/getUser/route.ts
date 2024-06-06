import User from "@/model/user";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies?.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const userId = payload?.payload?.userId;

    const user = await User.findById(userId).select("-email -password -isVerified");

    return NextResponse.json(
      {
        message: "User found",
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
