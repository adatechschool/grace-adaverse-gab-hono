// app/components/newProjetPopup.tsx
"use client";
import { useState, useEffect } from "react";
import { proposerProjet } from "../actions/proposerProjet";

type Promo = { id: number; nom: string };
type ProjetAda = { id: number; nom: string };

export default function NewProjetPopup() {
  const [open, setOpen] = useState(false);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [projetsAda, setProjetsAda] = useState<ProjetAda[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      fetch("/api/promos").then(r => r.json()).then(setPromos);
      fetch("/api/projets-ada").then(r => r.json()).then(setProjetsAda);
    }
  }, [open]);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await proposerProjet(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 1500);
    }
  }

  return (
    <>
      <button className="btn btn--primary" onClick={() => setOpen(true)}>
        Proposer un projet
      </button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal__title">Proposer un projet</h2>

            {success ? (
              <p className="modal__success">Projet proposé avec succès ✅</p>
            ) : (
              <form className="modal__form" action={handleSubmit}>
                <input
                  className="modal__input"
                  name="titre"
                  placeholder="Titre du projet"
                  required
                />
                <input
                  className="modal__input"
                  name="auteur"
                  placeholder="Auteur(e) du projet"
                />
                <input
                  className="modal__input"
                  name="lienGithub"
                  placeholder="Lien GitHub"
                  required
                />
                <input
                  className="modal__input"
                  name="lienDemo"
                  placeholder="Lien démo (optionnel)"
                />
                <div className="modal__field">
                  <label className="modal__label">Date de création</label>
                  <input
                    className="modal__input"
                    name="dateCreation"
                    type="date"
                    required
                  />
                </div>
                <select className="modal__select" name="promoId" required>
                  <option value="">-- Choisir une promo --</option>
                  {promos.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))}
                </select>
                <select className="modal__select" name="projetAdaId" required>
                  <option value="">-- Choisir un projet Ada --</option>
                  {projetsAda.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))}
                </select>

                {error && <p className="modal__error">{error}</p>}

                <div className="modal__actions">
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => setOpen(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn--primary">
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