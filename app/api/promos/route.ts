import { db } from "@/src";
import { promosTable } from "@/src/db/schema";
import { NextResponse } from "next/server";

//CREACIÓN DE RUTA PARA OBTENER LAS PROMOS Y QUE APAREZCAN EN EL SELECT DEL FORM
export async function GET() {
    const promos = await db.select().from(promosTable);
    return NextResponse.json(promos);
}