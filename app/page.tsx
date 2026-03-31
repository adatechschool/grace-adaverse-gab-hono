import NewProjetPopup from "./components/newProjetPopup";

export default function Home() {
  return (
    <main>

      {/* Header */}
      <header>
        <h1>
          Adaverse
        </h1>
        <NewProjetPopup />
      </header>

      {/* Hero */}
      <section>
        <p>
          Ada Tech School
        </p>
        <h2>
          Les projets des apprenants
        </h2>
        <p>
          Découvrez les projets réalisés par les étudiants d'Ada Tech School,
          classés par catégorie et promotion.
        </p>
      </section>

      {/* Contenido principal */}
      <section>
        <p>
          Les projets publiés apparaîtront ici.
        </p>
      </section>

    </main>
  );
}