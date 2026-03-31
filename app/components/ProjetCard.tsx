//app/components/ProjetCard.tsx

import { getThumbnailUrl } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProjetCardProps = {
    id: number;
    titre: string;
    slug: string;
    auteur: string | null;
    lienGithub: string;
    datePublication: string;
    dateCreation: string;
    promoNom: string;
}

export default function ProjetCard({ id, titre, slug, auteur, lienGithub, dateCreation, promoNom }: ProjetCardProps) {

    const [imgSrc, setImgSrc] = useState(getThumbnailUrl(lienGithub));

    return (
        <Link href={`/projets/${slug}`}>
            <div>
            <Image
                src={imgSrc}
                alt={`Thumbnail du projet ${titre}`}
                width={300}
                height={180}
                // Si la imagen no carga (no hay thumbnail.png en el repo), usa la imagen por defecto
                onError={() => setImgSrc("/default-thumbnail.png")}
                unoptimized // necesario para imágenes externas de GitHub
            />
            <h3>{titre}</h3>
            {auteur && <p>{auteur}</p>}
            <p>{promoNom}</p>
            <p>{dateCreation}</p>  
            </div>
        </Link>
    )
}