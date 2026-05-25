import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createMiddlewareClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not authenticated and trying to access protected routes
  if (!user && request.nextUrl.pathname.startsWith("/projects")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl, {
      headers: response.headers,
    });
  }

  // If user is authenticated and trying to access login page
  if (user && request.nextUrl.pathname === "/login") {
    const projectsUrl = request.nextUrl.clone();
    projectsUrl.pathname = "/projects";

    return NextResponse.redirect(projectsUrl, {
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
