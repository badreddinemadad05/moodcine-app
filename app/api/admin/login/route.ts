import { NextResponse } from "next/server";

// POST /api/admin/login — vérifie le mot de passe et pose un cookie de session
export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected     = process.env.ADMIN_PASSWORD;

    if (!expected) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD non configuré dans .env.local" },
        { status: 500 }
      );
    }

    if (!password || password !== expected) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("moodcine_admin", password, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:   60 * 60 * 24 * 7, // 7 jours
      path:     "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}
