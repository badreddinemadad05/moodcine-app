import { NextResponse } from "next/server";
import { getMovies, addMovie } from "@/services/movies";
import type { MovieInsert } from "@/services/movies";

// GET /api/movies — liste de tous les films (actifs ou tous)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive  = searchParams.get("all") === "1";
    const movies = await getMovies(includeInactive);
    return NextResponse.json(movies);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/movies — ajoute un film (admin seulement)
export async function POST(request: Request) {
  try {
    const body: MovieInsert = await request.json();
    const movie = await addMovie(body);
    return NextResponse.json(movie, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
