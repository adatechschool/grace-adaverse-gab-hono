"use client";
// "use client" indica que este componente se ejecuta en el navegador.
// Es necesario porque usamos useState, useEffect y eventos del usuario.

import { useState, useEffect } from "react";
import { proposerProjet } from "../actions/proposerProjet";

type Promo = { id: number; nom: string };
type ProjetAda = { id: number; nom: string };

export default function NewProjetPopup() {
  // Estado para controlar si el dialog está abierto o cerrado
  const [open, setOpen] = useState(false);
  
  // Datos para poblar los <select> del formulario
  const [promos, setPromos] = useState<Promo[]>([]);
  const [projetsAda, setProjetsAda] = useState<ProjetAda[]>([]);
  
  // Estado para mensajes de error o éxito
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Se ejecuta cada vez que el dialog se abre.
  // Fetcha las promos y proyectos Ada para llenar los selects.
  // El array [open] significa: "ejecuta esto cuando 'open' cambie".
  useEffect(() => {
    if (open) {
      fetch("/api/promos").then(r => r.json()).then(setPromos);
      fetch("/api/projets-ada").then(r => r.json()).then(setProjetsAda);
    }
  }, [open]);

  // Función que se ejecuta al hacer submit del formulario.
  // Llama a la Server Action y gestiona la respuesta.
  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await proposerProjet(formData);

    if (result.error) {
      // Si la Server Action retorna un error, lo mostramos en el formulario
      setError(result.error);
    } else {
      // Si todo fue bien, mostramos confirmación y cerramos el dialog
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 1500);
    }
  }

  return (
    <>
      {/* Botón en el header que abre el dialog */}
      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700"
      >
        Proposer un projet
      </button>

      {/* El dialog solo se renderiza en el DOM cuando open === true */}
      {open && (
        // Overlay oscuro detrás del dialog
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          {/* Contenedor del dialog */}
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Proposer un projet</h2>

            {success ? (
              // Mensaje de éxito temporal antes de cerrar
              <p className="text-green-600 font-medium">Projet proposé avec succès ✅</p>
            ) : (
              // action={handleSubmit} conecta el submit del form con nuestra función
              <form action={handleSubmit} className="flex flex-col gap-4">
                
                {/* Título — obligatorio */}
                <input
                  name="titre"
                  placeholder="Titre du projet"
                  className="border rounded px-3 py-2"
                  required
                />

                {/* Auteur — el nombre de quien propone el proyecto */}
                <input
                  name="auteur"
                  placeholder="Auteur(e) du projet"
                  className="border rounded px-3 py-2"
                />

                {/* GitHub — obligatorio */}
                <input
                  name="lienGithub"
                  placeholder="Lien GitHub"
                  className="border rounded px-3 py-2"
                  required
                />

                {/* Demo — opcional */}
                <input
                  name="lienDemo"
                  placeholder="Lien démo (optionnel)"
                  className="border rounded px-3 py-2"
                />

                {/* Fecha de creación — el usuario la elige */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Date de création</label>
                  <input
                    name="dateCreation"
                    type="date"
                    className="border rounded px-3 py-2"
                    required
                  />
                </div>

                {/* Select de promos — se puebla desde /api/promos */}
                <select name="promoId" className="border rounded px-3 py-2" required>
                  <option value="">-- Choisir une promo --</option>
                  {promos.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))}
                </select>

                {/* Select de proyectos Ada — se puebla desde /api/projets-ada */}
                <select name="projetAdaId" className="border rounded px-3 py-2" required>
                  <option value="">-- Choisir un projet Ada --</option>
                  {projetsAda.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))}
                </select>

                {/* Mensaje de error si la Server Action retorna { error } */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded border hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-red-600 text-black hover:bg-red-700"
                  >
                    Proposer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}