import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("refreshToken");
  const publicPaths = ["/login", "/register"];
  const path = request.nextUrl.pathname;

  const isPublicPath = publicPaths.includes(path);

  if (!authToken && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authToken && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
