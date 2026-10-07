import { Figtree, IBM_Plex_Mono } from "next/font/google";

// Les polices de l'app (thème Glass) : Figtree pour le texte, IBM Plex Mono pour les afficheurs.
export const fontSans = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});
