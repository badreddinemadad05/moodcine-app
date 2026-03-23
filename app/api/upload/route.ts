/**
 * ─── Route d'upload d'images ─────────────────────────────────────────────────
 * POST /api/upload
 * Reçoit un fichier image en multipart/form-data,
 * le sauvegarde dans /public/posters/ et retourne l'URL locale.
 *
 * ⚠️  Fonctionne en mode local uniquement.
 *     Pour la production → remplacer par Supabase Storage.
 */

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB   = 5;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file     = formData.get("file") as File | null;

    if (!file || !file.size) {
      return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
    }

    // Validation type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Format non supporté. Utilise JPG, PNG ou WebP." },
        { status: 400 }
      );
    }

    // Validation taille
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `Fichier trop lourd (max ${MAX_SIZE_MB} Mo)` },
        { status: 400 }
      );
    }

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier si nécessaire
    const postersDir = path.join(process.cwd(), "public", "posters");
    await mkdir(postersDir, { recursive: true });

    // Nom de fichier unique
    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const safeExt  = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
    const filePath = path.join(postersDir, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/posters/${filename}` });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Erreur serveur lors de l'upload" }, { status: 500 });
  }
}
