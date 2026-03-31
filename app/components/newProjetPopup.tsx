//app/components/nowProjetPopup.tsx

"use client"; // "use client" indica que este componente se ejecuta en el navegador.

import { useState, useEffect } from "react";
import { proposerProjet } from "../actions/proposerProjet";

type Promo = { id: number; nom: string };
type ProjetAda = { id: number; nom: string };

export default function NewProjetPopup() {
  
  // Estado para controlar si el popup está abierto o cerrado
  const [open, setOpen] = useState(false);
  
  // Datos para poblar los <select> del formulario
  const [promos, setPromos] = useState<Promo[]>([]);
  const [projetsAda, setProjetsAda] = useState<ProjetAda[]>([]);
  
  // Estado para mensajes de error o éxito
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Este useEffect es para recuperar a través de un fetch las promos y los proyectos de ada, para así poder ponerlos en los <select>
  //Se ejecuta cuando el popup está [open]
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
      {/* Botón en el header que abre popup */}
      <button onClick={() => setOpen(true)}>
        Proposer un projet
      </button>

      {/* El popup solo se renderiza en el DOM cuando open === true */}
      {open && (
        <div>          
          <div>
            <h2>Proposer un projet</h2>

            {success ? (
              // Mensaje de éxito temporal antes de cerrar
              <p>Projet proposé avec succès ✅</p>
            ) : (
              <form action={handleSubmit}>                
                <input
                  name="titre"
                  placeholder="Titre du projet"
                  required // Es obligatorio poner un título
                />

                <input
                  name="auteur"
                  placeholder="Auteur(e) du projet"
                />

                <input
                  name="lienGithub"
                  placeholder="Lien GitHub"
                  required // Link obligatorio para validar el form
                />

                <input
                  name="lienDemo"
                  placeholder="Lien démo (optionnel)"
                />

                <div>
                  <label>Date de création</label>
                  <input
                    name="dateCreation"
                    type="date"
                    required // obligatorio para el form
                  />
                </div>

                <select name="promoId" required>
                  <option value="">-- Choisir une promo --</option>
                  {promos.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))}
                </select>

                <select name="projetAdaId" required>
                  <option value="">-- Choisir un projet Ada --</option>
                  {projetsAda.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))}
                </select>

                {/* Mensaje de error si la Server Action "proposerProjet" retorna { error } */}
                {error && <p>{error}</p>}

                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
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