import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./utils/jwtToken";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/user/")) {
    const token = req.cookies?.get("token");
    const verified = await verifyJwtToken(token?.value || "");
    console.log("VERIFIED", verified);
    
    if (!verified) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    const token = req.cookies?.get("token");
    const verified = await verifyJwtToken(token?.value || "");
    console.log("VERIFIED", verified);


    if (verified) {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/user/dashboard"],
};
