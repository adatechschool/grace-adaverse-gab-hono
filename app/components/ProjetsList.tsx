// app/components/ProjetsList.tsx
"use client"

import { useState } from "react";
import ProjetCard from "./ProjetCard";

type Projet = {
    id: number;
    titre: string;
    slug: string;
    auteur: string | null;
    lienGithub: string;
    lienDemo: string | null;
    dateCreation: string;
    datePublication: string | null;
    promoNom: string;
    projetAdaNom: string;
    projetAdaId: number;
}

type ProjetsListProps = {
    projets: Projet[];
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((acc, item) => {
        const group = String(item[key]);
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

export default function ProjetsList({ projets }: ProjetsListProps) {
    const [filtrePromo, setFiltrePromo] = useState<string>("toutes");
    const [filtreCategorie, setFiltreCategorie] = useState<string>("toutes");

    // Listas únicas para los botones de filtro
    const promos = ["toutes", ...Array.from(new Set(projets.map(p => p.promoNom)))];
    const categories = ["toutes", ...Array.from(new Set(projets.map(p => p.projetAdaNom)))];

    // Aplicar filtros
    const projetsFiltres = projets.filter(p => {
        const matchPromo = filtrePromo === "toutes" || p.promoNom === filtrePromo;
        const matchCategorie = filtreCategorie === "toutes" || p.projetAdaNom === filtreCategorie;
        return matchPromo && matchCategorie;
    });

    const grouped = groupBy(projetsFiltres, "projetAdaNom");

        return (
        <div>
            <div className="filters">
            <div className="filters__group">
                {promos.map(promo => (
                <button
                    key={promo}
                    onClick={() => setFiltrePromo(promo)}
                    className={`filter-btn${filtrePromo === promo ? " filter-btn--active" : ""}`}
                >
                    {promo === "toutes" ? "Toutes les promos" : promo}
                </button>
                ))}
            </div>
            <div className="filters__group">
                {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFiltreCategorie(cat)}
                    className={`filter-btn${filtreCategorie === cat ? " filter-btn--active" : ""}`}
                >
                    {cat === "toutes" ? "Toutes les catégories" : cat}
                </button>
                ))}
            </div>
            </div>

            {projetsFiltres.length === 0 ? (
            <p>Aucun projet pour cette sélection.</p>
            ) : (
            Object.entries(grouped).map(([categorie, items]) => (
                <div key={categorie} className="categorie-block">
                <h2 className="categorie-block__title">{categorie}</h2>
                <div className="projets-grid">
                    {items.map(projet => (
                    <ProjetCard key={projet.id} {...projet} />
                    ))}
                </div>
                </div>
            ))
            )}
        </div>
        );
}