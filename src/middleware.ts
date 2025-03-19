import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Define the path you want to redirect from
  if (req.nextUrl.pathname === "/dashboard/customer") {
    return NextResponse.redirect(
      new URL("/dashboard/customer/my-order", req.url)
    );
  }
  if (req.nextUrl.pathname === "/dashboard/provider") {
    return NextResponse.redirect(
      new URL("/dashboard/provider/manage-menu", req.url)
    );
  }

  return NextResponse.next(); // Continue processing the request if no redirect is needed
}

// Define the matcher if you only want this middleware to apply to specific paths
export const config = {
  matcher: ["/dashboard/customer", "/dashboard/provider"],
};
