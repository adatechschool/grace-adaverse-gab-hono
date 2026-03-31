//app/actions/proposerProjet.ts
"use server"

import { db } from "@/src";
import { projetEtudiantsTable } from "@/src/db/schema";
import { generateSlug } from "@/src/lib/utils";
import { eq } from "drizzle-orm";


export async function proposerProjet(formData: FormData) {

// FormData es el objeto que Next.js pasa automáticamente cuando se usa action={} en un <form>
// Contiene todos los campos del formulario como pares clave/valor.

    //Declaración de constantes que serán enviadas a BDD
    const titre = formData.get("titre") as string;
    const lienGithub = formData.get("lienGithub") as string;
    const lienDemo = formData.get("lienDemo") as string | null;
    const auteur = formData.get("auteur") as string;
    const dateCreation = formData.get("dateCreation") as string;
    const promoId = Number(formData.get("promoId"));
    const projetAdaId = Number(formData.get("projetAdaId"));

    //Validación de campos obligatorios
    if (!titre || !lienGithub) {
        return { error: "Le titre et le lien Github sont obligatoires à remplir dans le formulaire."}
    }

    // Primera inserción con un slug provisional basado en el título.
    const [inserted] = await db
    .insert(projetEtudiantsTable)
    .values({
        titre,
        slug: generateSlug(titre), // slug provisional, se actualiza en el "await db" para ser más preciso
        lienGithub,
        lienDemo: lienDemo || null,
        auteur,
        promoId,
        projetAdaId,
        dateCreation,
    })
    .returning( { id: projetEtudiantsTable.id });
    // .returning() recupera el id generado por la BD que necesitamos para construir el slug definitivo.

     // Actualización del slug con el id real para garantizar unicidad.
    await db
    .update(projetEtudiantsTable)
    .set({ slug: `${generateSlug(titre)}-${inserted.id}`})
    .where(eq(projetEtudiantsTable.id, inserted.id));

    return { success: true }
}