//app/api/projets/route.ts
import { db } from "@/src";
import { projetEtudiantsTable, projetsAdaTable, promosTable } from "@/src/db/schema";
import { desc, eq, isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const projets = await db
    .select({
        id: projetEtudiantsTable.id,
        titre: projetEtudiantsTable.titre,
        slug: projetEtudiantsTable.slug,
        auteur: projetEtudiantsTable.auteur,
        lienGithub: projetEtudiantsTable.lienGithub,
        lienDemo: projetEtudiantsTable.lienDemo,
        dateCreation: projetEtudiantsTable.dateCreation,
        datePublication: projetEtudiantsTable.datePublication,
        promoNom: promosTable.nom,
        projetAdaNom: projetsAdaTable.nom,
        projetAdaId: projetsAdaTable.id,
    })
    .from(projetEtudiantsTable)
    .innerJoin(promosTable, eq(projetEtudiantsTable.promoId, promosTable.id))
    .innerJoin(projetsAdaTable, eq(projetEtudiantsTable.projetAdaId, projetsAdaTable.id))
    .where(isNotNull(projetEtudiantsTable.datePublication))
    .orderBy(desc(projetEtudiantsTable.dateCreation));

    return NextResponse.json(projets);
}