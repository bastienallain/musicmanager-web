---
name: Devosound — site
description: Le site vitrine habillé comme l'app : un ampli McIntosh la nuit, en bulles sombres.
colors:
  chassis: "#07080A"
  chassis-colonne: "#0A0C0F"
  popover: "#101216"
  bulle-haut: "#1B1F25"
  bulle-bas: "#14171B"
  bulle-tableau: "#16191E"
  relief-haut: "#2A3038"
  relief-bas: "#20252B"
  entree-choisie-haut: "#17233A"
  entree-choisie-bas: "#121B2D"
  texte: "#E9EDF2"
  texte-doux: "#C6CDD5"
  texte-secondaire: "#8A94A0"
  texte-discret: "#5F6975"
  bleu-mcintosh: "#4A8DFF"
  bleu-survol: "#7FB0FF"
  vert-sans-perte: "#30D26A"
  vert-hd: "#249E50"
  ambre-basse-def: "#E0A458"
  or-achat: "#D4A94A"
typography:
  display:
    fontFamily: "Bauhaus Std, Figtree, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bauhaus Std, Figtree, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Figtree, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Figtree, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  readout:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  badge: "4px"
  pochette: "6px"
  controle: "8px"
  bulle-petite: "13px"
  bulle: "16px"
  bulle-grande: "20px"
  pilule: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.bleu-mcintosh}"
    textColor: "{colors.chassis}"
    rounded: "{rounded.pilule}"
    padding: "0 24px"
    height: "44px"
  button-bulle:
    backgroundColor: "{colors.bulle-haut}"
    textColor: "{colors.texte}"
    rounded: "{rounded.pilule}"
    padding: "0 17px"
    height: "34px"
  button-relief:
    backgroundColor: "{colors.relief-haut}"
    textColor: "{colors.texte}"
    rounded: "{rounded.controle}"
  card-bulle:
    backgroundColor: "{colors.bulle-haut}"
    textColor: "{colors.texte}"
    rounded: "{rounded.bulle-grande}"
    padding: "24px"
  entree-choisie:
    backgroundColor: "{colors.entree-choisie-haut}"
    textColor: "{colors.texte}"
    rounded: "{rounded.controle}"
  input-recherche:
    backgroundColor: "{colors.bulle-haut}"
    textColor: "{colors.texte}"
    rounded: "{rounded.pilule}"
    height: "44px"
  badge-qualite:
    textColor: "{colors.vert-sans-perte}"
    typography: "{typography.label}"
---

# Design System: Devosound — site

## Overview

**Creative North Star: "La façade de DAC"**

Le site porte la même identité que l'app : un ampli McIntosh dans une pièce sombre. Noir profond, chiffres bleus qui brillent doucement, rien de superflu. On y reconnaît l'appareil avant de lire une ligne. La matière est celle de la nouvelle direction « bulle » de l'app (maquette `devosound-design`, branche `valide`, `maquettes/bibliotheque/`) : des surfaces un peu plus claires que le châssis, posées dessus, en léger dégradé, cernées d'un contour d'un pixel qui va du clair au sombre et portées par une ombre. Tout le reste s'efface.

Ce fichier décrit le **monde cible**. Le site actuel (thème Glass : filets blancs, lueurs colorées, terre cuite décorative) est en migration vers lui, section par section. La source amont reste le `DESIGN.md` et les jetons de la maquette : si l'app change, ce fichier suit, jamais l'inverse. La direction bulle et les polices Bauhaus / Cocomat sont encore au statut « essai » dans `CHANGEMENTS.md` de la maquette ; le site la suit par décision de Bastien (11 octobre 2026).

Le web ajoute ce que l'app n'a pas : du défilement, des tailles de titres de page de présentation, du responsive jusqu'à 390 px. Ces ajouts gardent la grammaire de l'app, ils n'en inventent pas une autre.

**Key Characteristics:**
- Châssis noir, bulles légèrement plus claires, une seule famille d'ombre.
- Une couleur = un sens, jamais de couleur décorative.
- Chiffres en IBM Plex Mono, comme les afficheurs d'un appareil.
- Mouvements lents et doux (courbe in-out-sine, 280 à 600 ms).
- Minimal au repos, l'information secondaire se révèle au survol ou au défilement.

## Colors

Un noir d'appareil et quatre couleurs de signal, chacune liée à un seul sens.

### Primary
- **Bleu McIntosh** (#4A8DFF) : l'état actif, la sélection, les chiffres analysés, le lien d'action principal, le bouton « Notify me at launch ». Survol : **Bleu survol** (#7FB0FF). Il brille (léger halo) seulement sur ce qui est actif ou lu.

### Secondary
- **Vert sans perte** (#30D26A) : un format sans perte (FLAC, ALAC, WAV) et ce qui est vérifié bit à bit. Palier HD : **Vert HD** (#249E50).

### Tertiary
- **Ambre basse déf.** (#E0A458) : un son compressé ou de basse définition, et tout défaut. C'est la seule couleur d'alerte.
- **Or « Acheter HD »** (#D4A94A) : réservé à « Acheter HD ». Le site ne le montre pas tant que la fonction n'est pas validée.

### Neutral
- **Châssis** (#07080A) : le fond de la page.
- **Châssis colonne** (#0A0C0F) et **Popover** (#101216) : les zones en retrait et les panneaux flottants.
- **Bulle** (#1B1F25 → #14171B, en dégradé vertical ; #16191E en uni pour les tableaux) : les cartes, les boutons secondaires et les champs.
- **Relief** (#2A3038 → #20252B) : l'onglet ou le deck choisi, en relief.
- **Texte** (#E9EDF2), **Texte doux** (#C6CDD5), **Texte secondaire** (#8A94A0, artiste, description), **Texte discret** (#5F6975, libellés, en-têtes de colonnes).

### Named Rules
**The One Meaning Rule.** Le bleu veut dire actif, le vert sans perte, l'ambre compressé ou défaut, l'or acheter. Une couleur n'apparaît jamais pour décorer.

**The No Red Rule.** Pas de rouge, pas de bandeau d'alerte. Une erreur de formulaire se dit en ambre, avec un texte calme.

## Typography

**Display Font:** Bauhaus Std Demi (repli Figtree), logotype et gros titres seulement. Licence web à fournir par Bastien avant la mise en ligne.
**Body Font:** Figtree (repli -apple-system), tout le texte courant. Cocomat reste hors du site tant qu'on n'a qu'une version d'essai sans chiffres.
**Label/Mono Font:** IBM Plex Mono, tous les chiffres (BPM, clé, kHz, bits, dB, durées) et les libellés en capitales.

**Character:** une géométrie ronde et rétro pour les titres, comme une sérigraphie de façade ; un texte neutre et lisible ; des chiffres d'instrument.

### Hierarchy
- **Display** (600, clamp(2.5rem, 6vw, 4.5rem), 1.05) : le titre du hero.
- **Headline** (600, clamp(1.75rem, 3.5vw, 2.75rem), 1.1) : le titre de chaque section.
- **Title** (600, 1.25rem, 1.3) : les titres de cartes et de questions.
- **Body** (400, 1rem, 1.6) : descriptions, 65 à 72 caractères par ligne au plus.
- **Label** (Plex Mono 500, 0.6875rem, espacement 0.08em, capitales) : surtitres, en-têtes de colonnes, statuts (ANALYSÉ, SANS PERTE).
- **Readout** (Plex Mono 500, 0.875rem) : les valeurs mesurées.

### Named Rules
**The Readout Rule.** Un chiffre technique est toujours en Plex Mono. Analysé ou actif, il prend le bleu McIntosh avec un halo doux ; au repos, il reste en texte.

**The Weight Ladder Rule.** Dans un badge de qualité : format en 700, palier en 600, compressé en 500.

## Layout

Une seule colonne de sections, centrée, de 1200 px au plus, avec 24 px de marge latérale (16 px sous 640 px). Les sections respirent : 96 px entre elles sur desktop, 64 px sur mobile. Le rythme vient de l'alternance entre texte et bulle, pas de séparateurs.

Les captures de l'app sont montrées entières, dans une bulle de 16 à 20 px de rayon. Sous 768 px, la capture passe sous le texte, en pleine largeur. Aucun défilement horizontal.

**The No Divider Rule.** Ni filet ni trait entre deux sections ou deux lignes de contenu. Une zone se distingue par sa surface. Seule exception, héritée de l'app : le trait très sombre (#191C21) sous les lignes d'un tableau en bulle.

## Elevation & Depth

Profondeur par couches de tons, plus une ombre. Le châssis est au fond ; les bulles se posent dessus avec un dégradé du haut vers le bas, un contour d'un pixel qui s'éteint vers le bas (#3C434C → #22272D → #090B0D) et une ombre portée. Ce qui est choisi monte en relief.

### Shadow Vocabulary
- **Bulle** (`box-shadow: 0 10px 24px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.10), inset 0 -1px 0 rgba(0,0,0,.6)`) : cartes, boutons secondaires, champs, tableaux.
- **Relief** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -1px 0 rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.5)`) : l'élément choisi (onglet, deck, mode).
- **Popover** (`box-shadow: 0 12px 48px rgba(0,0,0,.6)`) : tout ce qui flotte (menu mobile, popover, infobulle).

### Named Rules
**The Halo Not Glow Rule.** Le halo bleu ou vert reste petit (flou d'environ 8 px) et ne se pose que sur un chiffre, une icône ou un témoin actif. Aucune nappe de couleur floue derrière une image ou une section.

## Shapes

Formes douces et arrondies, sans angle vif. Les pilules (34 à 44 px de haut) portent les actions. Les bulles vont de 13 px (petits boutons) à 20 px (cartes, barre de lecture). Les pochettes ont 6 px, les badges 4 px. Le contour n'est jamais un trait plein : c'est le dégradé d'un pixel de la bulle.

## Components

### Buttons
- **Shape :** pilule (999px).
- **Primaire :** fond bleu McIntosh, texte châssis, 44 px de haut, 24 px de marge interne. Un seul par écran visible.
- **Bulle :** fond bulle en dégradé, contour d'un pixel, ombre bulle, texte clair, icône en bleu. Survol : voile bleu léger, l'icône passe au bleu survol.
- **Survol et focus :** transition de 420 ms en in-out-sine ; focus visible en anneau bleu McIntosh de 2 px, décalé du fond.

### Chips
- **Style :** badges de qualité sans fond, format en couleur de sens (vert ou ambre) et palier en dessous, en Plex Mono capitales. Clé Camelot en petite tuile teintée à 12 %.
- **State :** une puce choisie monte en relief ; non choisie, elle reste plate en texte discret.

### Cards / Containers
- **Corner Style :** 16 à 20 px.
- **Background :** dégradé bulle (#1B1F25 → #14171B).
- **Shadow Strategy :** ombre bulle (voir Elevation & Depth).
- **Border :** contour d'un pixel en dégradé, jamais de bordure pleine.
- **Internal Padding :** 24 px (16 px sous 640 px).

### Inputs / Fields
- **Style :** bulle en pilule de 44 px, texte en Figtree, placeholder en texte discret, raccourci éventuel en petite tuile mono.
- **Focus :** anneau bleu McIntosh de 2 px et contour qui s'éclaire vers le bleu (420 ms).
- **Error / Disabled :** message et contour en ambre, jamais en rouge. Désactivé : 35 % d'opacité sur toute la bulle.

### Navigation
- **Style :** logotype « Devo » blanc + « sound » bleu en Bauhaus à gauche ; liens en texte secondaire, blancs au survol ; action « Notify me at launch » en bulle à droite. Sur mobile, menu en popover avec l'ombre popover.

### Barre de lecture (signature)
Bulle flottante de 20 px de rayon, détachée des bords : pochette, titre et artiste, transport, mini-wave dont la partie lue est bleue et le reste gris, puis Deck A / Deck B en bulle avec le deck choisi en relief. Le site peut la reprendre comme fil conducteur (hero, relais écoute → mix).

### Colonne de qualité (signature)
Format en couleur (vert sans perte, ambre compressé) avec le palier dessous ; halo pour la HD ; au survol de la case, les détails glissent de 7 px et apparaissent en 420 ms. Le site la montre telle quelle, c'est la promesse « la qualité réelle, toujours affichée ».

## Do's and Don'ts

### Do:
- **Do** utiliser les surfaces bulle (#1B1F25 → #14171B) avec leur contour d'un pixel et l'ombre bulle pour toute carte ou tout bouton secondaire.
- **Do** animer chaque changement d'état en `cubic-bezier(0.37, 0, 0.63, 1)` : 280 ms pour un voile, 420 ms pour un contrôle ou une révélation, 600 ms pour un fondu.
- **Do** écrire les chiffres techniques en IBM Plex Mono, en bleu McIntosh avec halo quand ils sont mesurés ou actifs.
- **Do** respecter `prefers-reduced-motion` : on supprime les déplacements et on garde au plus les fondus.
- **Do** utiliser comme visuels des captures de la maquette de l'app (2×, en WebP), pas d'anciennes captures Glass.

### Don't:
- **Don't** utiliser de rouge ni de bandeau d'alerte : l'ambre seul signale un défaut.
- **Don't** mettre de filets ou de bordures pleines entre des zones, ni de nappe colorée floue derrière une image ou une section.
- **Don't** utiliser une couleur pour décorer : la terre cuite du deck B n'apparaît qu'avec un deck B, l'or qu'avec « Acheter HD ».
- **Don't** faire d'animation plus rapide que 200 ms, ni faire apparaître ou disparaître un élément d'un coup.
- **Don't** ajouter de texte qui répète une icône, ni d'infobulle sur un élément qui a déjà un libellé.
- **Don't** mélanger sur une même page des captures de l'ancien style Glass et de la nouvelle direction.
