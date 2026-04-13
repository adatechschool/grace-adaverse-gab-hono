import { db } from "@/src/index";
import { projetEtudiantsTable, projetsAdaTable } from "./schema";
import { generateSlug } from "../lib/utils";
import { eq } from "drizzle-orm";

async function insertPdfProjects() {
  const today = new Date().toISOString().split("T")[0];

  // 1. Créer les nouveaux types de projets Ada
  const [adalgo] = await db
    .insert(projetsAdaTable)
    .values({ nom: "Adalgo" })
    .returning({ id: projetsAdaTable.id });
  console.log(`✅ Projet Ada créé: Adalgo (id: ${adalgo.id})`);

  const [adashboard] = await db
    .insert(projetsAdaTable)
    .values({ nom: "Adashboard" })
    .returning({ id: projetsAdaTable.id });
  console.log(`✅ Projet Ada créé: Adashboard (id: ${adashboard.id})`);

  const [adaverse] = await db
    .insert(projetsAdaTable)
    .values({ nom: "Adaverse" })
    .returning({ id: projetsAdaTable.id });
  console.log(`✅ Projet Ada créé: Adaverse (id: ${adaverse.id})`);

  // 2. Insérer les projets étudiants
  const projets = [
    // --- Hugo M. (Grace = 2) ---
    {
      titre: "Adataviz Hugo",
      auteur: "Hugo M.",
      lienGithub: "https://github.com/adatechschool/grace-adataviz-Hgo92",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 2, // Adataviz
      dateCreation: today,
    },
    {
      titre: "Adashboard Hugo",
      auteur: "Hugo M.",
      lienGithub: "https://github.com/adatechschool/grace-adashboard-Hgo92",
      lienDemo: null,
      promoId: 2,
      projetAdaId: adashboard.id,
      dateCreation: today,
    },

    // --- Candice Ch. (Grace = 2) ---
    {
      titre: "Adataviz Candice",
      auteur: "Candice Ch.",
      lienGithub: "https://github.com/adatechschool/grace-adataviz-Candichou",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 2, // Adataviz
      dateCreation: today,
    },
    {
      titre: "Adashboard Candice",
      auteur: "Candice Ch.",
      lienGithub:
        "https://github.com/adatechschool/grace-adashboard-Candichou",
      lienDemo: null,
      promoId: 2,
      projetAdaId: adashboard.id,
      dateCreation: today,
    },

    // --- Émilie G. (Grace = 2) ---
    // Quiz, Pokada, Adataviz, AdaReview, Adapage ya están en seed
    {
      titre: "Adalgo Émilie",
      auteur: "Émilie G.",
      lienGithub: "https://github.com/adatechschool/grace-adalgo-egainon",
      lienDemo: null,
      promoId: 2,
      projetAdaId: adalgo.id,
      dateCreation: today,
    },
    {
      titre: "Adashboard Émilie",
      auteur: "Émilie G.",
      lienGithub: "https://github.com/adatechschool/grace-adashboard-egainon",
      lienDemo: null,
      promoId: 2,
      projetAdaId: adashboard.id,
      dateCreation: today,
    },

    // --- Gul (Grace = 2) ---
    {
      titre: "Adalgo Gul",
      auteur: "Gul",
      lienGithub: "https://github.com/adatechschool/grace-adalgo-Gkhosty",
      lienDemo: null,
      promoId: 2,
      projetAdaId: adalgo.id,
      dateCreation: today,
    },

    // --- Zineb (Grace = 2) ---
    {
      titre: "Adashboard Zineb",
      auteur: "Zineb",
      lienGithub: "https://github.com/adatechschool/grace-adashboard-zineb712",
      lienDemo: null,
      promoId: 2,
      projetAdaId: adashboard.id,
      dateCreation: today,
    },
    {
      titre: "Adapage Zineb & Hugo",
      auteur: "Zineb & Hugo M.",
      lienGithub: "https://github.com/adatechschool/grace-adapage-zineb-hugo",
      lienDemo: null,
      promoId: 2,
      projetAdaId: 5, // Adapage
      dateCreation: today,
    },

    // --- Xinzhu (Frida = 1) ---
    {
      titre: "Adaverse Xinzhu",
      auteur: "Xinzhu",
      lienGithub: "https://github.com/adatechschool/frida-adaverse-Xinzhu99",
      lienDemo: null,
      promoId: 1,
      projetAdaId: adaverse.id,
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

  console.log("🎉 Tous les projets ont été insérés.");
  process.exit(0);
}

insertPdfProjects().catch((err) => {
  console.error("❌ Erreur:", err);
  process.exit(1);
});