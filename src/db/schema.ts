import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const projetsAdaTable = pgTable("projets_ada", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nom: varchar({ length: 50 }).notNull(),
})

export const promosTable = pgTable("promos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nom: varchar({ length: 50 }).notNull(),
    dateDebut: date().notNull(),
})

export const projetEtudiantsTable = pgTable("projets_etudiants", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    titre: varchar({ length: 100 }).notNull(),
    auteur: varchar({ length: 20}),
    slug: varchar({ length: 255}).notNull().unique(),
    img: text(),
    lienGithub: varchar({ length: 255}).notNull(),
    lienDemo: varchar({ length: 255}),
    dateCreation: date().notNull().defaultNow(),
    datePublication: date(), 
    promoId: integer().notNull().references(() => promosTable.id),
    projetAdaId: integer().notNull().references(() => projetsAdaTable.id),
})