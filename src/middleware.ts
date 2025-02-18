import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("refreshToken");
  console.log(authToken);

  const publicPaths = ["/login", "/register"];
  const path = request.nextUrl.pathname;

  // Check if the path is public
  const isPublicPath = publicPaths.includes(path);

  // Redirect to login if accessing protected route without token
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
