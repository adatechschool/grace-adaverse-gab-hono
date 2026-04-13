// src/db/insertNewProjects.ts
// Ejecutar UNA sola vez con: npx tsx src/db/insertNewProjects.ts

import { db } from "@/src/index";
import { projetEtudiantsTable, projetsAdaTable } from "./schema";
import { generateSlug } from "../lib/utils";
import { eq } from "drizzle-orm";

async function insertNewProjects() {
  const today = new Date().toISOString().split("T")[0];

  // 1. Créer le nouveau type de projet Ada
  const [adaskill] = await db
    .insert(projetsAdaTable)
    .values({ nom: "Adaskill" })
    .returning({ id: projetsAdaTable.id });

  console.log(`✅ Projet Ada créé: Adaskill (id: ${adaskill.id})`);

  // 2. Insérer les projets étudiants
  const projets = [
    // --- Gabriel H (Grace Hopper = 2) ---
    {
      titre: "CitySon",
      auteur: "Gabriel H.",
      lienGithub: "https://github.com/gab-hono/citySon",
      lienDemo: "https://city-son-r7g5.vercel.app/",
      promoId: 2,
      projetAdaId: 11, // Indépendants
      dateCreation: "2026-02-01",
    },
    {
      titre: "Portfolio Hono",
      auteur: "Gabriel H.",
      lienGithub: "https://github.com/gab-hono/portfolio-hono",
      lienDemo: "https://portfolio-hono.vercel.app/",
      promoId: 2,
      projetAdaId: 12, // Portfolios
      dateCreation: "2026-03-01",
    },
    // --- Sam Pym (Grace Hopper = 2) ---
    {
      titre: "Adaskill",
      auteur: "Sam Pym",
      lienGithub: "https://github.com/Sammyhein/AdaSkill",
      lienDemo: "https://ada-skill.vercel.app/",
      promoId: 2,
      projetAdaId: adaskill.id,
      dateCreation: today,
    },
    {
      titre: "WakfuGoultard",
      auteur: "Sam Pym",
      lienGithub: "https://github.com/Sammyhein/WakfuGoultard",
      lienDemo: "https://wakfu-goultard.vercel.app/",
      promoId: 2,
      projetAdaId: 5, // Adapage
      dateCreation: today,
    },
    {
      titre: "ParisEvents",
      auteur: "Sam Pym",
      lienGithub: "https://github.com/Sammyhein/ParisEvents",
      lienDemo: "https://paris-events-delta.vercel.app/",
      promoId: 2,
      projetAdaId: 2, // Adataviz
      dateCreation: today,
    },
  ];

  for (const projet of projets) {
    const [inserted] = await db
      .insert(projetEtudiantsTable)
      .values({
        ...projet,
        slug: generateSlug(projet.titre),
        datePublication: today,
      })
      .returning({ id: projetEtudiantsTable.id });

    await db
      .update(projetEtudiantsTable)
      .set({ slug: `${generateSlug(projet.titre)}-${inserted.id}` })
      .where(eq(projetEtudiantsTable.id, inserted.id));

    console.log(`✅ Inséré: ${projet.titre} (id: ${inserted.id})`);
  }

  console.log("🎉 Terminé !");
  process.exit(0);
}

insertNewProjects().catch((err) => {
  console.error("❌ Erreur:", err);
  process.exit(1);
});