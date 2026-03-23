import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Protection de la route /admin ───────────────────────────────────────────
// Vérifie qu'un cookie "moodcine_admin" contenant le bon mot de passe est présent
// Si absent → redirige vers /admin/login

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Laisser passer la page de login et les API d'auth
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout")
  ) {
    return NextResponse.next();
  }

  // Protéger toutes les autres routes /admin
  if (pathname.startsWith("/admin")) {
    const token    = request.cookies.get("moodcine_admin")?.value;
    const expected = process.env.ADMIN_PASSWORD;

    if (!token || !expected || token !== expected) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
