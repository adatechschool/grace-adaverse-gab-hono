//app/api/projets-ada/route.ts

import { db } from "@/src"
import { projetsAdaTable } from "@/src/db/schema"
import { NextResponse } from "next/server";

//CREACIÓN DE RUTA PARA OBTENER LOS NOMBRES DE LOS PROYECTOS Y QUE APAREZCAN EN EL SELECT DEL FORM
export async function GET() {
    const projetsAda = await db.select().from(projetsAdaTable);
    return NextResponse.json(projetsAda);
}