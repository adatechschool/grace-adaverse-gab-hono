CREATE TABLE "projets_etudiants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projets_etudiants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"titre" varchar(100) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"img" text,
	"lienGithub" varchar(255) NOT NULL,
	"lienDemo" varchar(255),
	"dateCreation" date DEFAULT now() NOT NULL,
	"datePublication" date,
	"promoId" integer NOT NULL,
	"projetAdaId" integer NOT NULL,
	CONSTRAINT "projets_etudiants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "projets_ada" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projets_ada_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nom" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "promos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nom" varchar(50) NOT NULL,
	"dateDebut" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projets_etudiants" ADD CONSTRAINT "projets_etudiants_promoId_promos_id_fk" FOREIGN KEY ("promoId") REFERENCES "public"."promos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projets_etudiants" ADD CONSTRAINT "projets_etudiants_projetAdaId_projets_ada_id_fk" FOREIGN KEY ("projetAdaId") REFERENCES "public"."projets_ada"("id") ON DELETE no action ON UPDATE no action;