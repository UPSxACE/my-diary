import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const guestRoutes = ["/login", "/register"];
const privateRoutes = ["/app"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  const isGuestRoute = guestRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isPrivateRoute = privateRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
