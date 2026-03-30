import { db } from "@/src/index";
import { projetEtudiantsTable, projetsAdaTable, promosTable } from "./schema";
import { generateSlug } from "../lib/utils";
import { eq } from "drizzle-orm";

async function seed() {
  await db.insert(projetsAdaTable).values([
    { nom: "Ada Quiz" },
    { nom: "Adataviz" },
    { nom: "AdaReview" },
    { nom: "Pokada" },
    { nom: "Adapage" },
  ]);

  await db.insert(promosTable).values([
    { nom: "Frida Kahlo", dateDebut: "2025-03-01" },
    { nom: "Grace Hopper", dateDebut: "2025-09-01" },
  ]);

  const today = new Date().toISOString().split("T")[0];

  const projets = [
    {
      titre: "Quiz Ghibli",
      auteur: "Gabriel H.",
      lienGithub: "https://github.com/gab-hono/Quiz-Ghibli",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 1,
    },
    {
      titre: "Pokedex Gab",
      auteur: "Gabriel H.",
      lienGithub: "https://github.com/gab-hono/Pokedex",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 4,
    },
    {
      titre: "Piscines de Paris",
      auteur: "Gabriel H.",
      lienGithub: "https://github.com/gab-hono/PiscinesParis-Frontend",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 2,
    },
    {
      titre: "Delicious Review",
      auteur: "Gabriel H.",
      lienGithub: "https://github.com/gab-hono/deliciousReview",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 3,
    },
    {
      titre: "Adapage Gabriel & Emilie",
      auteur: "Gabriel H. & Emilie G.",
      lienGithub: "https://github.com/adatechschool/grace-adapage-gabriel-emilie",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 5,
    },
    {
      titre: "Adataviz Emilie",
      auteur: "Emilie G.",
      lienGithub: "https://github.com/egainon/Adataviz-emilie",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 2,
    },
    {
      titre: "Adatabase Emilie",
      auteur: "Emilie G.",
      lienGithub: "https://github.com/egainon/Adatabase-Em",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 3,
    },
    {
      titre: "Pokedex Explorer",
      auteur: "Emilie G.",
      lienGithub: "https://github.com/egainon/Pokedex_Explorer",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 4,
    },
  ];

  for (const projet of projets) {
    const [inserted] = await db
      .insert(projetEtudiantsTable)
      .values({
        ...projet,
        slug: generateSlug(projet.titre),
        dateCreation: today,
        datePublication: today,
      })
      .returning({ id: projetEtudiantsTable.id });

    await db
      .update(projetEtudiantsTable)
      .set({ slug: `${generateSlug(projet.titre)}-${inserted.id}` })
      .where(eq(projetEtudiantsTable.id, inserted.id));
  }

  console.log("Seed terminé ✅");
  process.exit(0);
}

seed();