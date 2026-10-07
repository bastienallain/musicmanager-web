# Contenu du site Devosound

Ce document décrit le contenu de la page d'accueil, section par section, avec toutes les fonctionnalités de l'app. C'est la source de vérité du contenu du site : le texte vit dans `src/lib/config.tsx` et les sections dans `src/components/sections/`.

**Le site est en anglais** (décision du 3 octobre 2026). Les textes de ce document sont en français : ils servent de référence de sens, à traduire dans un anglais sobre et naturel, sans les calquer mot à mot.

État de l'app au 7 octobre 2026 : branche `test/essai` du dépôt de l'app (design « Glass »), vérifiée sur `docs/fonctionnalites.md` et sur le code.

---

## 1. Points en attente

| Point | Où en est-on | En attendant |
| --- | --- | --- |
| **Nom de l'app** | **Devosound** (décision du 5 octobre 2026). Le dépôt et le paquet Python de l'app gardent le nom `MusicManager`. | `siteConfig.name` reste la seule source du nom sur le site. |
| **Plateformes** | macOS (Apple Silicon) au lancement. Windows et Linux sont annoncés « coming soon ». | Pas de date ni de fonctionnalité promise pour Windows et Linux (`siteConfig.platforms`). |
| **Section Tarifs** (`pricing`) | Affichée à la demande de Bastien, avec des montants **indicatifs**. | Marquer clairement les montants comme provisoires ; ils restent à valider. |
| **Témoignages** (`testimonials`) | Le modèle contient de faux avis. | Les supprimer. Aucun témoignage inventé : on garde seulement de vraies citations, avec l'accord de leur auteur. |
| **Téléchargement** | L'app n'est pas encore distribuée. | Bouton « Notify me at launch » (liste d'attente), sans lien de téléchargement. |
| **Langue** | Anglais (décision du 3 octobre 2026). | Une version française pourra venir plus tard. |
| **DSD** | Le moteur DSD est complet et testé, mais les fichiers `.dsf` et `.dff` ne sont pas reconnus par le scan : ils n'entrent pas dans la bibliothèque (#182 de l'app). | Le site parle du DSD comme d'une capacité du moteur, en disant qu'on ne peut pas encore ajouter ces fichiers. Rien sur le DSD dans le hero, les formats ni les tarifs. |
| **Streaming DLNA** | Validé seulement sur un renderer simulé ; aucune marque essayée en vrai (#117 de l'app). | Pas de noms de marques ni de « tout streamer est compatible ». |

---

## 2. Positionnement

**En une phrase :** l'app de bibliothèque musicale pour les DJ et les audiophiles sur Mac : un son bit-perfect, une collection propre et une table de mixage, dans une seule app.

**Pour qui :**
- les **DJ** qui préparent leurs sets à partir de fichiers (FLAC, WAV, MP3…) et veulent une bibliothèque fiable : BPM, tonalité, grille de temps, pochettes, tags propres ;
- les **audiophiles** avec un DAC, un ampli ou un streamer réseau qui veulent entendre leurs fichiers haute résolution sans compromis.

**Ce qui la distingue :**
1. **Qualité de son vérifiée, pas promise.** La lecture est bit-perfect, c'est-à-dire que les échantillons du fichier arrivent intacts à la carte son. Des tests automatiques le contrôlent (empreinte du son sorti comparée à celle du fichier).
2. **Bibliothèque et DJ dans la même app.** On passe de l'écoute au mix d'un clic, et le morceau en cours continue sur la platine choisie.
3. **Une collection qui reste propre toute seule.** BPM et grille analysés en arrière-plan, tags complétés depuis MusicBrainz et Discogs, pochettes jusqu'à 1200 px, suivi des fichiers déplacés, supprimés ou modifiés pendant que l'app était fermée.

**Ton :** précis et calme, comme un appareil hi-fi. On évite le jargon marketing et les superlatifs. Chaque promesse technique doit être vraie ; la section 7 dit lesquelles éviter.

**Mots-clés SEO** (`siteConfig.keywords`, en anglais) : bit-perfect music player Mac, DJ music library, hi-res FLAC player macOS, gapless music player Mac, DLNA OpenHome player, BPM key detection Camelot, DJ software Mac, music collection manager, MusicBrainz Discogs tagging.

---

## 3. Contenu par section du modèle

Les noms de sections correspondent à `web/src/app/page.tsx`.

### Header
Liens : Fonctionnalités · Hi-fi · DJ · Tarifs · Questions · bouton « Me prévenir ».

### Hero
- **Titre :** « Votre musique, telle qu'elle a été enregistrée. »
- **Sous-titre :** « Bibliothèque, lecture bit-perfect et table de mixage DJ réunies dans une app, pensée d'abord pour le Mac. Du FLAC 16 bits au 24 bits / 384 kHz, envoyé tel quel à votre DAC. »
- **Bouton :** « Me prévenir de la sortie », et un lien secondaire « Voir les fonctionnalités ».
- **Formats affichés sous le hero :** FLAC, WAV, AIFF, ALAC, MP3, AAC, Ogg Vorbis, jusqu'à 768 kHz. Pas de DSF ni de DFF tant qu'ils n'entrent pas dans la bibliothèque.
- **Visuel :** la Bibliothèque Glass avec la galerie de pochettes et la barre de lecture, voir la section 5.

### FeatureScroll : trois écrans qui défilent
1. **Bibliothèque** : galerie de pochettes au-dessus de la liste, BPM et clé Camelot sur chaque ligne, file « À suivre » qu'on réordonne en glissant.
2. **Lecteur** : BPM et clé dans le vert des afficheurs, mini-onde qui sert de barre de progression, aléatoire et répéter, qualité réelle dans l'en-tête.
3. **DJ Mixer** : deux platines, mixer central, formes d'onde couleur avec grille, hot cues et boucles, zoom de ×1 à ×8.

### FeatureHighlight : les trois arguments forts

1. **Bit-perfect, vérifié.**
   « L'app règle votre carte son sur la fréquence de chaque morceau et lui envoie les échantillons tels quels, sans conversion ni volume logiciel. Le mode est affiché en permanence : Bit-perfect, Rééchantillonné 192 → 96 kHz, ou Bluetooth (son compressé). Rien n'est caché. »
   Panneau de chiffres : fichiers lus de 16/44,1 à 32/768, bruit du rééchantillonnage de secours à −141 dB, 24 bits effectifs en sortie entière sur macOS, 10 types de liaison de sortie reconnus (Mac, USB, HDMI, DisplayPort, Bluetooth, AirPlay, Thunderbolt, FireWire, PCI, AVB).

2. **Une vraie table de mixage.**
   « Deux platines avec SYNC du tempo et de la phase, keylock, 8 hot cues, boucles de 1 à 16 temps calées sur la grille, égaliseur 3 bandes avec KILL, et pré-écoute au casque sur une seconde sortie. Chargé depuis la bibliothèque avec A ou B, un morceau attend en pause. Un clic sur la clé d'une platine ouvre le sélecteur de l'autre, filtré sur les clés compatibles. »
   Chiffres : 8 hot cues par platine, boucles de 1 à 16 temps, 11 ms de l'appui au son, zoom des formes d'onde de ×1 à ×8.

3. **Une collection impeccable.**
   « BPM et grille de temps analysés en arrière-plan, clés Camelot en un lot. Tags vides complétés depuis MusicBrainz et Discogs en ne retenant que l'album officiel de l'artiste, jamais une compilation au hasard. Pochettes jusqu'à 1200 px. »

### BentoGrid : quatre cartes
1. **Forme d'onde couleur.** Les graves en rouge, les médiums en vert, les aigus en bleu : on lit la structure d'un morceau d'un coup d'œil. Style Serato ou VirtualDJ au choix dans les Réglages ; zoom de ×1 à ×8 dans le DJ Mixer.
2. **Streaming hi-fi DLNA / OpenHome.** Le fichier part tel quel vers votre streamer, jusqu'au 24/384, sans blanc quand le streamer le permet. Les appareils OpenHome reçoivent toute la file. Pas encore essayé sur des marques précises.
3. **DSD, dans le moteur.** Le moteur lit le DSF et le DFF : DoP vers les DAC compatibles, conversion PCM pour les autres. Les fichiers DSD ne peuvent pas encore être ajoutés à la bibliothèque.
4. **Mix harmonique.** La roue de Camelot propose les morceaux compatibles avec celui que vous jouez.

### Benefits : bénéfices concrets
- « Écoutez vos fichiers hi-res comme ils ont été masterisés. »
- « Passez de l'écoute au mix sans couper la musique. »
- « Retrouvez n'importe quel morceau parmi 50 000 en un instant. » (recherche par ⌘K, filtres par genre, format, clé et plage de BPM)
- « Ne perdez plus vos notes et vos repères quand vous renommez un fichier. »

### Features : la grille complète
Six cartes : Hi-fi bit-perfect, File « À suivre », Streaming DLNA/OpenHome, DJ Mixer, Analyse et tags, Bibliothèque. Puis vingt fonctionnalités plus petites (`moreFeatures`). La liste détaillée est en section 4.

### FAQ
Voir la section 6.

### CTA
« Bientôt sur Mac. Laissez votre e-mail, on vous prévient à la sortie. »

### Footer
Liens : Fonctionnalités, Tarifs, Questions, Licences tierces, Contact. L'adresse de contact viendra avec le nom de domaine.

---

## 4. Inventaire complet des fonctionnalités

> D'après `docs/fonctionnalites.md` et le code de la branche `test/essai` de l'app. Les chiffres viennent de mesures réelles faites pendant le développement.

### 4.1 Lecture haute fidélité
- **Lecture bit-perfect** sur la sortie du Mac et sur les DAC externes : la carte son est réglée sur la fréquence de chaque morceau, et les échantillons lui sont envoyés en entiers.
- **Formats PCM** : FLAC, WAV, AIFF, ALAC, MP3, AAC (AAC-LC), Ogg Vorbis, de 16 bits / 44,1 kHz jusqu'à **32 bits / 768 kHz** (705,6 et 768 kHz vérifiés sur une boucle logicielle, pas sur un vrai DAC).
- **Limite de macOS, dite honnêtement** : en 32 bits entier, macOS ne garde que 24 bits utiles, et l'app affiche « 24 bits effectifs ».
- **Mode exclusif** sur les DAC externes, pour qu'aucune autre app ne se mêle au son.
- **Détection automatique de la sortie** et de sa liaison : Mac, USB, HDMI, DisplayPort, Bluetooth, AirPlay, Thunderbolt, FireWire, PCI, AVB.
  - Un profil est gardé par appareil, et tout peut être forcé à la main.
  - Changer de sortie en pleine lecture reprend au même endroit. Si la sortie en cours disparaît, la lecture se met en pause au même endroit.
  - Menu de sortie en popover, ouvert par l'icône d'enceinte de la barre de lecture.
- **Affichage permanent de la qualité réelle**, dans l'en-tête : Bit-perfect, Rééchantillonné (avec les fréquences), Bluetooth (son compressé), Mode DJ.
- **Rééchantillonnage de secours** quand l'appareil n'accepte pas la fréquence du fichier :
  - on reste si possible dans la même famille de fréquences (192 → 96, 176,4 → 88,2) ;
  - le calcul se fait en 64 bits avec dither ;
  - bruit et distorsion mesurés à −141 dB.
- **Volume sans bruit** : le volume matériel de l'appareil est utilisé en priorité. Sur un DAC externe, le volume logiciel est bloqué à 100 %.
- **ReplayGain** (EBU R128, −14 LUFS) en option dans le lecteur, désactivé par défaut. L'app indique alors que la lecture n'est plus bit-perfect. Analyse lancée à la main.
- **Suréchantillonnage** vers 176,4 ou 192 kHz en option, désactivé par défaut.
- **Enchaînement sans blanc** entre deux morceaux au même format (environ 50 ms si le format change).
- **Barre de lecture Glass** : pochette, titre, BPM et clé en vert, mini-onde de 60 barres qui sert de barre de progression et se clique, volume, Deck A / Deck B, sortie.
- **Aléatoire et répéter** : l'aléatoire joue toute la liste lancée sans repasser par un morceau avant d'avoir tout joué ; répéter la liste ou le morceau. État gardé d'un lancement à l'autre.

### 4.2 File « À suivre »
- « Lire ensuite » met des morceaux en tête de file, « Ajouter à la file » à la fin, sans créer de playlist.
- Réordonnée en glissant ; ajout par glisser-déposer depuis les listes, clic droit, ⇧⌘L ou ⇧⌘F.
- Un morceau joué reste dans la file, grisé, et se relance d'un double-clic.
- Toute la file s'enregistre en playlist d'un clic.
- Panneau à droite de la liste de la Bibliothèque, et ligne « À suivre » dans la barre latérale.
- Limites : la file est vide au lancement (rien n'est enregistré) ; la diffusion DLNA ne la suit pas.

### 4.3 DSD (moteur seulement)
- Le moteur lit les fichiers **DSF et DFF** : DoP du DSD64 au DSD256 vers les DAC compatibles (profil de sortie, mode exclusif, sortie 24 bits), DSD512 converti en PCM.
- Volume verrouillé et silence DSD au démarrage et à l'arrêt, pour éviter tout claquement.
- Conversion DSD → PCM : bruit à −123 dB dans la bande audible.
- **Inaccessible depuis l'app aujourd'hui** : le scan ne reconnaît pas `.dsf` ni `.dff`, et il n'y a pas d'autre moyen d'ouvrir un fichier. Ni lecture locale, ni DLNA.

### 4.4 Streaming réseau hi-fi (DLNA / UPnP / OpenHome)
- Clic droit sur une sélection de la Bibliothèque → « Lire sur un streamer réseau ».
- **Fichier envoyé tel quel**, jusqu'au 24/384 et au 32 bits, si le streamer annonce le format.
- **OpenHome** pris en charge : la file d'attente est envoyée au streamer, avec repli automatique sur le mode UPnP standard.
- **Enchaînement sans blanc** si le streamer gère la commande « morceau suivant » ; déplacement dans le morceau depuis le streamer.
- **Profil par appareil.** Si le streamer refuse un format PCM, conversion FLAC sans perte, après confirmation.
- **Le Mac ne se met pas en veille** pendant la diffusion.
- Limites : validé seulement sur un streamer simulé, aucune marque essayée en vrai ; la lecture s'arrête de charger la suite quand l'app est fermée.

### 4.5 DJ Mixer
- **Deux platines** : lecture, CUE, pitch (±8 %), **keylock** (toujours actif).
- **SYNC** du tempo et de la phase, demi et double tempo compris. Le deck que le public entend est signalé par le badge **MAÎTRE**.
- **8 hot cues** (deux banques de 4), **boucles de 1 à 16 temps** calées sur la grille, quantize. Hot cues et boucle gardés avec le morceau.
- **Égaliseur 3 bandes** avec **KILL** par bande, le spectre du morceau étant affiché en fond.
- **Crossfader** à puissance constante, faders de voie, **transition automatique** (fondu de 3 à 60 s).
- **Pré-écoute au casque** sur une seconde sortie, dérive d'horloge entre les deux cartes compensée ; dosage casque/master ; pré-écoute d'un morceau depuis le sélecteur sans le charger.
- **Formes d'onde couleur** des deux decks, l'une sous l'autre, avec grille de temps, hot cues et boucle ; **style Serato ou VirtualDJ** (Réglages) ; **zoom de ×1 à ×8**, commun aux deux decks.
- **Chargement depuis la bibliothèque** : A ou B charge le morceau en pause, comme dans Rekordbox, Serato ou Traktor. Quand A et B sont chargés, le DJ Mixer s'ouvre (réglable).
- **Titres déjà joués grisés** dans le sélecteur « Charger une piste », avec l'heure de passage. Mémoire de la session.
- **Clé cliquable** : un clic sur la clé d'une platine ouvre le sélecteur de l'autre, filtré sur les clés compatibles.
- **Latence** d'environ 11 ms entre l'appui et le son (mesurée une fois).
- **Qualité** : morceaux gardés en 24 bits avec dither, mixage à 48 kHz, 96 kHz en option.
- **Relais avec la bibliothèque** : on passe de l'écoute au DJ Mixer sans arrêter la musique, le morceau continue sur la platine choisie au même endroit. Un deck déjà chargé n'est jamais écrasé. L'inverse fonctionne aussi.
- Pilotage à la souris et au clavier ; pas de contrôleur DJ matériel.

### 4.6 Bibliothèque
- **Scan des dossiers** et surveillance en temps réel :
  - nouveaux fichiers indexés automatiquement ;
  - **fichiers renommés ou déplacés suivis avec toutes leurs données** : favoris, notes, BPM, hot cues, playlists, historique ;
  - **rattrapage au démarrage** de ce qui a changé pendant que l'app était fermée, en tâche de fond ;
  - un disque débranché ne vide jamais la bibliothèque.
- **Fichiers introuvables gardés grisés** avec leurs repères, note, favori, playlists et historique ; ils redeviennent normaux si le fichier revient. Retrait groupé depuis le menu Fichier.
- **Titres de qualité trop basse grisés et ignorés** : MP3 sous 320 kb/s, AAC et Vorbis sous 256 kb/s, WAV et AIFF sous 16 bits ou 44,1 kHz, tout Opus et WMA. Une infobulle dit pourquoi.
- **Rapide** : 50 000 morceaux s'ouvrent en environ 100 ms.
- **Galerie de pochettes** en perspective au-dessus de la liste, qui glisse jusqu'au morceau en cours ; un clic lance la lecture à partir d'une pochette.
- **Affichage** : pochette ou initiales, titre et artiste, BPM, clé Camelot colorée, favori d'un clic, chargement sur la platine A ou B.
- **Recherche** dans l'en-tête (⌘K) ; **filtres** par genre, format, clé et plage de BPM.
- **Édition des tags**, en préservant les données de Serato, Rekordbox et Traktor.
- **Suppression** : les fichiers vont à la Corbeille du Mac par défaut ; « Supprimer définitivement » est une case à cocher.

### 4.7 Analyse audio
- **BPM au dixième et grille de temps** (premier temps, temps fort, indice de confiance), correction du demi et du double tempo selon le genre, calculés automatiquement en arrière-plan.
- **Tonalité** en notation Camelot, pour le mix harmonique, analysée en un lot depuis Harmonic Mix.
- **ReplayGain** EBU R128, analysé à la main.

### 4.8 Métadonnées et pochettes
- **Auto-Tagger MusicBrainz** : recherche structurée, durée vérifiée, choix de l'**album officiel de l'artiste** plutôt qu'une compilation. Remplit les champs vides, dans la base de l'app.
- **Enrichissement Discogs**, avec la clé de l'app ou un compte personnel (proposé au premier lancement et dans les Réglages).
- **Pochettes** via MusicBrainz et Cover Art Archive, jusqu'à 1200 px.

### 4.9 Organisation
- Playlists classiques et **Smart Playlists** à règles, en accès rapide dans la barre latérale.
- Favoris, **Historique** d'écoute (avec les morceaux les plus écoutés), **Nouveaux ajouts**.
- **Statistiques** : genres, répartition des BPM par tempo, formats avec la part sans perte, années.
- **Styles musicaux** et **Pochettes** en grilles.
- **Harmonic Mix** : roue de Camelot interactive.

### 4.10 Outils
- **Doublons** : détection et vérification.
- **Nettoyage** : fichiers de qualité trop basse ou incomplets, listés avant suppression.
- **Conversion de formats** vers WAV, AIFF et FLAC en gardant la résolution d'origine, plus MP3 et Ogg.
- **Export DJ** : liste Rekordbox XML (sans clé, hot cues ni grille), fichiers WAV, tableur CSV.

### 4.11 Intégration Mac et interface
- Design **Glass** : fond presque noir, accent bleu azur, afficheurs verts pour le BPM et la clé, polices Figtree et IBM Plex Mono, icônes Phosphor. Fenêtre redimensionnable, plein écran, barre de titre intégrée.
- **Barre latérale** : Explorer (Bibliothèque, À suivre, Favoris, Nouveaux ajouts, Styles musicaux), playlists en accès rapide, sections en popover.
- **Réglages** (⌘,) : style de forme d'onde, compte Discogs, ouverture du DJ Mixer quand A et B sont chargés.
- **Raccourcis clavier** : Espace pour lecture et pause ; flèches pour reculer ou avancer de 10 s (30 s avec Maj) ; Cmd + flèches pour le morceau précédent ou suivant et pour le volume ; ⌘K pour chercher.
- **Widget « À l'écoute »** du centre de contrôle : titre, artiste, pochette et position.
- **Licences tierces** consultables dans l'app (menu Aide).

---

## 5. Visuels

Les captures viennent du dépôt de l'app, sur une base de démonstration sans données personnelles. Elles sont en cours de remplacement par des captures du design Glass.

Pour régénérer des captures propres en haute définition :

```bash
cd ~/Github/MusicManager && QT_SCALE_FACTOR=2 uv run python scripts/apercu_ui.py --sortie captures_site
```

**Design de l'app (Glass), à refléter sur le site :**

| Rôle | Couleur |
| --- | --- |
| Fond | presque noir `#07080A` |
| Accent | bleu azur `#4A8DFF` |
| Afficheurs (BPM, clé) | vert `#30D26A` |
| Deck B | terre cuite `#D08B6C` |
| Forme d'onde | rouge pour les graves, vert pour les médiums, bleu pour les aigus |

Polices : Figtree pour le texte, IBM Plex Mono pour les chiffres. Icônes Phosphor dans l'app ; le site garde `lucide-react`, au trait proche.

---

## 6. FAQ

- **Qu'est-ce que « bit-perfect » ?**
  Les échantillons de votre fichier arrivent à la carte son sans aucune modification : ni rééchantillonnage, ni volume logiciel, ni effet. L'app affiche en permanence si c'est le cas, et sinon pourquoi.

- **Quels formats sont lus ?**
  FLAC, WAV, AIFF, ALAC, MP3, AAC, Ogg Vorbis, jusqu'à 32 bits / 768 kHz. Le moteur gère le DSD (DSF et DFF), mais ces fichiers ne peuvent pas encore être ajoutés à la bibliothèque. Opus et WMA ne sont pas lus.

- **Pourquoi certains morceaux sont-ils grisés ?**
  Le fichier est introuvable, ou sa qualité est trop basse (un MP3 sous 320 kb/s, par exemple). Le morceau garde ses repères, ses notes et son historique, mais n'est ni lu ni chargé sur une platine ; une infobulle dit pourquoi. Dans la file « À suivre » et le sélecteur du DJ Mixer, le gris signale aussi les morceaux déjà joués.

- **L'app peut-elle supprimer mes fichiers ?**
  Seulement si vous le demandez. Les fichiers vont à la Corbeille du Mac, sauf si vous choisissez de les supprimer définitivement.

- **Faut-il un DAC ?**
  Non. L'app s'adapte à la sortie du Mac, à un DAC USB, à un appareil HDMI ou à un streamer réseau, et montre la qualité réellement obtenue.

- **Et le Bluetooth ?**
  Il fonctionne, mais le Bluetooth compresse toujours le son. L'app le signale honnêtement.

- **Mon streamer est compatible ?**
  L'app utilise le DLNA / UPnP standard, et les streamers OpenHome reçoivent toute la file. Elle a été testée sur un renderer simulé, pas encore sur des marques précises : on ne peut pas encore donner de liste de modèles.

- **Puis-je mixer avec ?**
  Oui : deux platines, SYNC, keylock, hot cues, boucles, égaliseur et pré-écoute au casque, à la souris et au clavier. Pas de contrôleur DJ matériel.

- **Mes repères Serato, Rekordbox ou Traktor sont-ils conservés ?**
  Oui, l'app ne touche pas aux données des autres logiciels quand elle écrit des tags.

- **Sur quels systèmes ?**
  Mac (Apple Silicon) au lancement. Windows et Linux arrivent plus tard.

---

## 7. À ne pas promettre

- Une date ou des fonctionnalités pour Windows et Linux (seulement « coming soon »), ni l'iPhone.
- **La lecture de fichiers DSD dans l'app** : le moteur existe, mais les fichiers n'entrent pas dans la bibliothèque. Ni DSD dans le hero, les formats ou les tarifs. Et jamais de DSD natif sur Mac : c'est le DoP, ou une conversion PCM.
- Le 32 bits bit-perfect sur Mac : 24 bits effectifs.
- La lecture des formats Opus et WMA (ils apparaissent grisés).
- La lecture des MP3 sous 320 kb/s et des autres fichiers sous le seuil de qualité : ils sont grisés et ignorés.
- **Les touches média du clavier** et les boutons du widget « À l'écoute » : non vérifiés sur l'app lancée. On ne parle que de l'affichage du widget.
- **Une compatibilité avec des marques de streamers** (Linn, Naim, Cambridge…) : DLNA validé seulement sur un streamer simulé.
- La lecture qui continue quand l'app est fermée avec OpenHome : pas encore.
- La tonalité et le ReplayGain calculés automatiquement : ils se lancent à la main. Le BPM au millième : il est arrondi au dixième.
- Les tags et pochettes écrits dans les fichiers : l'Auto-Tagger, Discogs et les pochettes écrivent dans la base de l'app.
- Un export Rekordbox complet (clés, hot cues, grilles, playlists) : le XML est minimal.
- Le transfert automatique des téléchargements : ses chemins sont propres à un poste, sans réglage.
- Une compatibilité avec des contrôleurs DJ matériels : rien n'est prévu pour l'instant.
- Une date de sortie, des prix définitifs (seulement indicatifs) ou des témoignages inventés.

---

## 8. Remplir `web/src/lib/config.tsx`

| Clé | Contenu |
| --- | --- |
| `name` | Le nom choisi (section 1) |
| `description` | La phrase de positionnement (section 2) |
| `keywords` | Les mots-clés de la section 2 |
| `features` | Six cartes : Hi-fi bit-perfect, File « À suivre », Streaming DLNA/OpenHome, DJ Mixer, Analyse et tags, Bibliothèque |
| `moreFeatures` | Vingt lignes (grille de 4 colonnes) ; les clés d'icônes sont résolues dans `components/sections/features.tsx` |
| `featureHighlight` | Les trois arguments de la section 3 |
| `bento` | Les quatre cartes de la section 3 |
| `benefits` | Les bénéfices de la section 3 |
| `faqs` | La section 6 |
| `pricing` | Montants indicatifs, présentés comme provisoires (section 1) |
| `testimonials` | Vide tant qu'il n'y a pas de vraies citations |
| `platforms` | macOS au lancement, Windows et Linux « coming soon » |
| `links` | Contact (à venir), GitHub si le dépôt devient public (décision de Bastien) |

Les icônes du site viennent de `lucide-react`.
