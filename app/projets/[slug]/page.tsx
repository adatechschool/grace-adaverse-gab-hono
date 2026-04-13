// app/projets/[slug]/page.tsx
import { getThumbnailUrl } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Projet = {
    id: number;
    titre: string;
    slug: string;
    auteur: string | null;
    lienGithub: string;
    lienDemo: string | null;
    dateCreation: string;
    promoNom: string;
    projetAdaNom: string;
}

async function getProjet(slug: string): Promise<Projet | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projets/${slug}`, {
        cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
}

export default async function ProjetPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const projet = await getProjet(slug);

    if (!projet) notFound();

    return (
        <main className="main">
            <div className="detail">

                <div className="detail__image-wrapper">
                    <Image
                        src={getThumbnailUrl(projet.lienGithub)}
                        alt={`Thumbnail du projet ${projet.titre}`}
                        fill
                        unoptimized
                    />
                </div>

                <div className="detail__content">
                    <Link href="/" className="detail__back">
                        ← Retour
                    </Link>

                    <div className="detail__meta">
                        <span className="detail__categorie">{projet.projetAdaNom}</span>
                        <span className="detail__promo">{projet.promoNom}</span>
                    </div>

                    <h1 className="detail__title">{projet.titre}</h1>

                    {projet.auteur && (
                        <p className="detail__auteur">{projet.auteur}</p>
                    )}

                    <p className="detail__date">{projet.dateCreation}</p>

                    <div className="detail__actions">
                    
                        <a href={projet.lienGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary">
                            Voir sur GitHub
                        </a>
                        {projet.lienDemo && (
                            <a
                                href={projet.lienDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--secondary"
                            >
                                Voir la démo
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}