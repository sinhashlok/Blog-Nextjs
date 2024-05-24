import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = NextResponse.json(
      { message: "Logged out successfully", success: true },
      { status: 200 }
    );
    res.cookies.delete("token");
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
