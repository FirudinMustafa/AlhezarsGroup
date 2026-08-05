import { NextResponse } from "next/server";

export function middleware() {
  if (process.env.SITE_DISABLED === "true") {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
