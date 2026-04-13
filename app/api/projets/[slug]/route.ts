// app/api/projets/[slug]/route.ts
import { db } from "@/src";
import { projetEtudiantsTable, projetsAdaTable, promosTable } from "@/src/db/schema";
import { eq, isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const [projet] = await db
        .select({
            id: projetEtudiantsTable.id,
            titre: projetEtudiantsTable.titre,
            slug: projetEtudiantsTable.slug,
            auteur: projetEtudiantsTable.auteur,
            lienGithub: projetEtudiantsTable.lienGithub,
            lienDemo: projetEtudiantsTable.lienDemo,
            dateCreation: projetEtudiantsTable.dateCreation,
            promoNom: promosTable.nom,
            projetAdaNom: projetsAdaTable.nom,
        })
        .from(projetEtudiantsTable)
        .innerJoin(promosTable, eq(projetEtudiantsTable.promoId, promosTable.id))
        .innerJoin(projetsAdaTable, eq(projetEtudiantsTable.projetAdaId, projetsAdaTable.id))
        .where(eq(projetEtudiantsTable.slug, slug))

    if (!projet) {
        return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
    }

    return NextResponse.json(projet);
}