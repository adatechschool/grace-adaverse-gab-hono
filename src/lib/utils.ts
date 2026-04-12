//src/lib/utils.ts

export function generateSlug(titre: string): string {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

//esta función toma el user y repo a través del link de github, y crea el path para recuerar la imagen thumbnail
export function getThumbnailUrl(lienGithub: string): string {
  try {
    const url = new URL(lienGithub);
    const parts = url.pathname.split("/").filter(Boolean);
    const user = parts[0];
    const repo = parts[1];

    return `https://github.com/${user}/${repo}/blob/main/thumbnail.png?raw=true`;
  } catch {
    return "/no-image-available.jpg"; // imagen por defecto (en carpeta "public") si el link no resulta ser válido
  }
}