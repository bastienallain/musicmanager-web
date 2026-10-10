# Product

<!-- impeccable:product-schema 1 -->

Le détail du contenu (texte des sections, inventaire des fonctionnalités, FAQ, promesses interdites) vit dans `CONTENU-SITE.md`, qui reste la source de vérité. Ce fichier n'en garde que ce qui doit guider toute décision produit.

## Platform

web

## Users

Deux publics à égalité :

- **les DJ** qui préparent leurs sets à partir de fichiers (FLAC, WAV, MP3…) et veulent une bibliothèque fiable : BPM, tonalité, grille de temps, pochettes, tags propres ;
- **les audiophiles** équipés d'un DAC, d'un ampli ou d'un streamer réseau, qui veulent entendre leurs fichiers haute résolution sans compromis.

Les deux sont sur Mac (Apple Silicon). Ils évaluent l'app avant sa sortie, depuis ce site.

## Product Purpose

Devosound (ex-MusicManager) est une app Mac qui réunit une bibliothèque musicale, une lecture bit-perfect et une table de mixage DJ à deux platines. Elle n'est pas encore sortie, sur aucune plateforme ; le site est une page unique de présentation.

**Succès du site :** des inscriptions à la liste d'attente. « Join the waitlist » est la seule action ; il n'y a pas de lien de téléchargement.

## Positioning

1. **Qualité de son vérifiée, pas promise.** Les échantillons du fichier arrivent intacts à la carte son, et des tests automatiques le contrôlent (empreinte du son sorti comparée à celle du fichier). Le mode de sortie réel est toujours affiché.
2. **Bibliothèque et DJ dans la même app.** On passe de l'écoute au mix d'un clic, et le morceau continue sur la platine choisie, à la même position.
3. **Une collection qui reste propre seule.** BPM et grille analysés en arrière-plan, tags complétés depuis MusicBrainz et Discogs, fichiers renommés ou déplacés suivis avec toutes leurs données.

## Operating Context

- Le visiteur compare avec ses outils actuels (lecteurs audiophiles, logiciels DJ) et cherche des preuves techniques précises : formats, fréquences, profondeur de bits, mode de sortie.
- L'identité visuelle vient de l'app, dont le design a changé (octobre 2026) : direction « McIntosh » en bulles, définie dans le dépôt `bastienallain/devosound-design` (branche `valide`, `maquettes/bibliotheque/`). Le site s'aligne dessus ; voir `DESIGN.md`.
- Visuels : captures 2× de cette maquette (Chrome headless, `?gel=1&ecran=<clé>`), converties en WebP. Les captures actuelles de `src/assets/screens/` montrent l'ancien thème Glass et sont à remplacer.
- La maquette ne couvre pas encore le DJ Mixer ni Harmonic Mix : la section DJ du site attend leur maquette (décision du 11 octobre 2026).
- La bibliothèque de démonstration des captures est fictive (artistes inventés, dont Léa Moreau et Marcel & Jules).

## Capabilities and Constraints

- Site en **anglais** (décision du 3 octobre 2026), ton sobre.
- **Rien n'est sorti** : macOS (Apple Silicon) en premier, puis Windows et Linux, tous « coming soon », sans date ni fonctionnalité promise. Ne jamais parler de « launch ».
- À ne jamais promettre : iPhone, la lecture de fichiers DSD (le moteur existe, mais les .dsf/.dff n'entrent pas dans la bibliothèque), les touches média, une compatibilité DLNA par marque, le 32 bits bit-perfect (24 bits effectifs), Opus/WMA, les contrôleurs DJ matériels, une date de sortie, le bouton « Acheter en HD ». Liste complète : section 7 de `CONTENU-SITE.md`.
- Titres basse définition (#371 de l'app) : lus, format en ambre, mais exclus des analyses, des platines et des exports.
- **Tarifs** : montants indicatifs, à valider ; ils doivent rester marqués comme provisoires.
- Images : WebP au minimum, jamais de PNG ; `next/image` responsive.

## Brand Commitments

- Nom : **Devosound** (décision du 5 octobre 2026), seule source `siteConfig.name`. Logotype « Devo » + « sound ».
- Voix : précise et calme, comme un appareil hi-fi (univers Audiolab, Ayon, McIntosh). Pas de jargon marketing ni de superlatifs. Chaque promesse technique doit être vraie.
- Ce que Devosound n'est pas : une app grand public de streaming, un logiciel DJ « club » tape-à-l'œil, un utilitaire gris sans caractère.
- Thème sombre uniquement. Logo et icône définitifs pas encore livrés.
- Polices : Bauhaus Std pour le logotype et les gros titres (licence web fournie par Bastien), Figtree pour le texte, IBM Plex Mono pour les chiffres.

## Evidence on Hand

- Captures : `src/assets/screens/*.webp` (ancien thème, à remplacer par la maquette).
- Mesures techniques citables : bruit du rééchantillonneur de secours mesuré à −141 dB, bibliothèque de 50 000 morceaux ouverte en environ 100 ms, fichiers de 16/44,1 à 32/768.
- **Absents, à ne pas inventer :** témoignages, clients, presse, logos de partenaires, date de sortie, prix définitifs, compatibilités de marques.

## Product Principles

1. **Prouver plutôt qu'affirmer** : chaque argument s'appuie sur un chiffre, une capture ou un comportement vérifiable.
2. **Honnêteté sur les limites** : ce que l'app ne fait pas encore est dit clairement, ou tu.
3. **Deux publics, un seul produit** : l'écoute hi-fi et le mix DJ sont présentés comme les deux faces d'une même app, sans qu'un public éclipse l'autre.
4. **Une seule action** : tout mène à l'inscription à la liste d'attente.

## Accessibility & Inclusion

WCAG 2.2 AA : contrastes, navigation clavier, focus visible, respect de `prefers-reduced-motion`.
