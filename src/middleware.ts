import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const authToken = request.cookies.get("refreshToken");
  // console.log(authToken);
  // const publicPaths = ["/login", "/register"];
  // const { nextUrl } = request;
  // // Check if the path is public
  // const isPublicPath = publicPaths.includes(nextUrl.pathname);
  // // Redirect to login if accessing protected route without token
  // if (!authToken && !isPublicPath) {
  //   return NextResponse.redirect(new URL("/login", nextUrl));
  // }
  // if (authToken && isPublicPath) {
  //   return NextResponse.redirect(new URL("/dashboard", nextUrl));
  // }
  // return;
}

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
