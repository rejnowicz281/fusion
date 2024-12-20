import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /login (login page)
         * - /register (register page)
         * - /auth/callback
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * - manifest.json (web app manifest)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|login|register|auth/callback|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
    ]
};
