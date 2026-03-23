import { NextResponse } from "next/server";

// POST /api/admin/logout — supprime le cookie de session
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("moodcine_admin", "", {
    httpOnly: true,
    maxAge:   0,
    path:     "/",
  });
  return response;
}
