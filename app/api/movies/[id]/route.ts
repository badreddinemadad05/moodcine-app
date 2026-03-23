import { NextResponse } from "next/server";
import { deleteMovie, updateMovie } from "@/services/movies";
import type { MovieInsert } from "@/services/movies";

// DELETE /api/movies/[id] — supprime un film
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteMovie(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/movies/[id] — met à jour un film
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: Partial<MovieInsert> = await request.json();
    const movie = await updateMovie(id, body);
    return NextResponse.json(movie);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
