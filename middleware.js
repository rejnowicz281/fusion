import { createClient } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const session = await supabase.auth.getSession();

    // if user is not signed in redirect to /login
    if (!session.data.session) return NextResponse.redirect(new URL("/login", request.url));

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /login (login page)
         * - /register (register page)
         * - /auth/callback
         */
        "/((?!_next/static|_next/image|favicon.ico|login|register|auth/callback).*)",
    ],
};
