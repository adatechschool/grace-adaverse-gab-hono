// app/components/ProjetCard.tsx
"use client"

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
    datePublication?: string | null;
    dateCreation: string;
    promoNom: string;
}

export default function ProjetCard({ titre, slug, auteur, lienGithub, dateCreation, promoNom }: ProjetCardProps) {

    const [imgSrc, setImgSrc] = useState(getThumbnailUrl(lienGithub));

    return (
        <Link href={`/projets/${slug}`} className="card">
            <div className="card__image-wrapper">
                <Image
                    src={imgSrc}
                    alt={`Thumbnail du projet ${titre}`}
                    fill
                    onError={() => setImgSrc("/default-thumbnail.png")}
                    unoptimized
                />
            </div>
            <div className="card__body">
                <h3 className="card__title">{titre}</h3>
                {auteur && <p className="card__author">{auteur}</p>}
                <span className="card__meta">{promoNom} · {dateCreation}</span>
            </div>
        </Link>
    );
}