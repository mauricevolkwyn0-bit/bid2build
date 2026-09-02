import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const { pathname } = request.nextUrl;

  // Never block API routes (PayFast webhooks etc.)
  if (pathname.startsWith("/api/")) return supabaseResponse;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Without Supabase config there's nothing to check — let the request through
  // rather than crashing the whole site.
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Middleware: missing Supabase environment variables");
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refresh session so it doesn't expire
    const { data: { user } } = await supabase.auth.getUser();

    // Check site status from DB
    const { data: settings } = await supabase
      .from("site_settings")
      .select("site_active")
      .eq("id", 1)
      .single();

    const siteActive = settings?.site_active ?? true;
    const isOwner = user?.email === process.env.SITE_OWNER_EMAIL;

    if (!siteActive) {
      // Site is inactive: redirect everyone except the owner to /maintenance
      if (!isOwner && pathname !== "/maintenance") {
        const url = request.nextUrl.clone();
        url.pathname = "/maintenance";
        return NextResponse.redirect(url);
      }
    } else {
      // Site is active: redirect non-owners away from /maintenance
      if (pathname === "/maintenance" && !isOwner) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    return supabaseResponse;
  } catch (error) {
    // Never let a Supabase/DB failure take the whole site down.
    console.error("Middleware error:", error);
    return supabaseResponse;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
