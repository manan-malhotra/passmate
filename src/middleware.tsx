import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  if (path === "/") return NextResponse.redirect(new URL("/home", request.url));
  if (token === "" && (path === "/addNew" || path === "/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token !== "" && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/login", "/signup", "/", "/addNew"],
};
