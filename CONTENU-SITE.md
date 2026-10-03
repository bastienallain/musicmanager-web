# Contenu du site MusicManager

Ce document décrit le contenu de la page d'accueil, section par section, avec toutes les fonctionnalités de l'app. C'est la source de vérité du contenu du site : le texte vit dans `src/lib/config.tsx` et les sections dans `src/components/sections/`.

**Le site est en anglais** (décision du 3 octobre 2026). Les textes de ce document sont en français : ils servent de référence de sens, à traduire dans un anglais sobre et naturel, sans les calquer mot à mot.

État de l'app au 4 octobre 2026 : branche `dev-v2` du dépôt de l'app.

---

## 1. Points en attente

| Point | Où en est-on | En attendant |
| --- | --- | --- |
| **Nom de l'app** | Le nom n'existe pas encore : il sera créé par le marketing, en partant d'une page blanche. « MusicManager » est seulement le nom de travail, et « musica. » un logotype de remplissage des maquettes : ni l'un ni l'autre n'est une option. | Garder « MusicManager » dans `siteConfig.name`, seule source du nom, pour pouvoir le remplacer partout d'un coup. |
| **Plateformes** | macOS (Apple Silicon) au lancement. Windows et Linux sont annoncés « coming soon ». | Pas de date ni de fonctionnalité promise pour Windows et Linux (`siteConfig.platforms`). |
| **Section Tarifs** (`pricing`) | Affichée à la demande de Bastien, avec des montants **indicatifs**. | Marquer clairement les montants comme provisoires ; ils restent à valider. |
| **Témoignages** (`testimonials`) | Le modèle contient de faux avis. | Les supprimer. Aucun témoignage inventé : on garde seulement de vraies citations, avec l'accord de leur auteur. |
| **Téléchargement** | L'app n'est pas encore distribuée. | Bouton « Notify me at launch » (liste d'attente), sans lien de téléchargement. |
| **Langue** | Anglais (décision du 3 octobre 2026). | Une version française pourra venir plus tard. |

---

## 2. Positionnement

**En une phrase :** l'app de bibliothèque musicale pour les DJ et les audiophiles sur Mac : un son bit-perfect, une collection propre et une table de mixage, dans une seule app.

**Pour qui :**
- les **DJ** qui préparent leurs sets à partir de fichiers (FLAC, WAV, MP3…) et veulent une bibliothèque fiable : BPM, tonalité, grille de temps, pochettes, tags propres ;
- les **audiophiles** avec un DAC, un ampli ou un streamer réseau (Cambridge, Linn, Naim…) qui veulent entendre leurs fichiers haute résolution sans compromis.

**Ce qui la distingue :**
1. **Qualité de son vérifiée, pas promise.** La lecture est bit-perfect, c'est-à-dire que les échantillons du fichier arrivent intacts à la carte son. Des tests automatiques le contrôlent bit à bit, jusqu'à 768 kHz.
2. **Bibliothèque et DJ dans la même app.** On passe de l'écoute au mix d'un clic, et le morceau en cours continue sur la platine choisie.
3. **Une collection qui reste propre toute seule.** Analyse BPM et tonalité, tags complétés depuis MusicBrainz et Discogs, pochettes en haute définition, suivi des fichiers déplacés ou supprimés.

**Ton :** précis et calme, comme un appareil hi-fi. On évite le jargon marketing et les superlatifs. Chaque promesse technique doit être vraie ; la section 7 dit lesquelles éviter.

**Mots-clés SEO** (`siteConfig.keywords`, en anglais) : bit-perfect music player Mac, DJ music library, hi-res FLAC player macOS, DSD DoP Mac, DLNA OpenHome player, BPM key detection Camelot, DJ software Mac, music collection manager, MusicBrainz Discogs tagging.

---

## 3. Contenu par section du modèle

Les noms de sections correspondent à `web/src/app/page.tsx`.

### Header
Liens : Fonctionnalités · Hi-fi · DJ · Questions · bouton « Me prévenir ».

### Hero
- **Titre :** « Votre musique, telle qu'elle a été enregistrée. »
- **Sous-titre :** « Bibliothèque, lecture bit-perfect et table de mixage DJ réunies dans une app Mac. Du FLAC 16 bits au 24 bits / 384 kHz et au DSD, sans aucune altération. »
- **Bouton :** « Me prévenir de la sortie », et un lien secondaire « Voir les fonctionnalités ».
- **Visuel :** la bibliothèque avec le lecteur en haut (forme d'onde couleur et VU-mètre), voir la section 5.

### FeatureScroll : trois écrans qui défilent
1. **Bibliothèque** : lignes avec pochette, BPM, clé Camelot colorée, boutons A/B.
2. **Lecteur** : grande forme d'onde couleur, affichage « Bit-perfect · FLAC 24/192 ».
3. **DJ Mixer** : deux platines, mixer central, formes d'onde superposées.

### FeatureHighlight : les trois arguments forts

1. **Bit-perfect, vérifié.**
   « L'app règle votre carte son sur la fréquence de chaque morceau et lui envoie les échantillons tels quels, sans conversion ni volume logiciel. Le mode est affiché en permanence : Bit-perfect, Rééchantillonné 192 → 96 kHz, ou Bluetooth (son compressé). Rien n'est caché. »

2. **Une vraie table de mixage.**
   « Deux platines avec SYNC du tempo et de la phase, keylock, 8 hot cues, boucles de 1 à 16 temps calées sur la grille, égaliseur 3 bandes avec KILL, et pré-écoute au casque sur une seconde sortie. Les morceaux restent en 24 bits avec dither. »

3. **Une collection impeccable.**
   « BPM, grille de temps et tonalité Camelot analysés automatiquement. Tags complétés depuis MusicBrainz et Discogs en ne retenant que l'album officiel de l'artiste, jamais une compilation au hasard. Pochettes en haute définition. »

### BentoGrid : quatre cartes
1. **Forme d'onde couleur.** Les graves en rouge, les médiums en vert, les aigus en bleu : on lit la structure d'un morceau d'un coup d'œil.
2. **Streaming hi-fi DLNA / OpenHome.** Le fichier part tel quel vers votre streamer, jusqu'au 24/384 et au DSD, avec un enchaînement sans blanc.
3. **DSD.** Lecture des DSF et DFF, envoi en DoP vers les DAC compatibles, conversion PCM de haute qualité pour les autres.
4. **Mix harmonique.** La roue de Camelot propose les morceaux compatibles avec celui que vous jouez.

### Benefits : bénéfices concrets
- « Écoutez vos fichiers hi-res comme ils ont été masterisés. »
- « Passez de l'écoute au mix sans couper la musique. »
- « Retrouvez n'importe quel morceau parmi 50 000 en un instant. »
- « Ne perdez plus vos notes et vos repères quand vous renommez un fichier. »

### Features : la grille complète
Une carte par famille. La liste détaillée est en section 4.

### FAQ
Voir la section 6.

### CTA
« Bientôt sur Mac. Laissez votre e-mail, on vous prévient à la sortie. »

### Footer
Liens : Fonctionnalités, Questions, Licences tierces, Contact. L'adresse de contact viendra avec le nom de domaine, qui dépend du nom de l'app.

---

## 4. Inventaire complet des fonctionnalités

> Tout ce qui suit est fusionné dans `dev-v2`. Les chiffres viennent de mesures réelles faites pendant le développement.

### 4.1 Lecture haute fidélité
- **Lecture bit-perfect** sur la sortie du Mac et sur les DAC externes : la carte son est réglée sur la fréquence de chaque morceau, et les échantillons lui sont envoyés en entiers.
- **Formats PCM** : FLAC, WAV, AIFF, ALAC, MP3, AAC, Ogg Vorbis, de 16 bits / 44,1 kHz jusqu'à **32 bits / 768 kHz**.
- **Limite de macOS, dite honnêtement** : en 32 bits entier, macOS ne garde que 24 bits utiles, et l'app affiche « 24 bits effectifs ».
- **Mode exclusif** sur les DAC externes, pour qu'aucune autre app ne se mêle au son.
- **Détection automatique de la sortie** : sortie du Mac, prise casque, HDMI, DAC USB, Bluetooth.
  - Un profil est gardé par appareil, et tout peut être forcé à la main.
  - Changer de sortie en pleine lecture reprend au même endroit.
- **Affichage permanent de la qualité réelle**, dans l'en-tête : Bit-perfect, Rééchantillonné (avec les fréquences), Bluetooth (son compressé), Mode DJ.
- **Rééchantillonnage de repli** quand l'appareil n'accepte pas la fréquence du fichier :
  - on reste dans la même famille de fréquences (192 → 96, 176,4 → 88,2) ;
  - le calcul se fait en 64 bits avec dither ;
  - bruit et distorsion mesurés à −141 dB.
- **Volume sans bruit** : le volume matériel de l'appareil est utilisé en priorité. Sur un DAC externe, le volume logiciel est bloqué à 100 %.
- **ReplayGain** (EBU R128, −14 LUFS) en option. L'app indique alors que la lecture n'est plus bit-perfect.
- **Suréchantillonnage** vers 176,4 ou 192 kHz en option, désactivé par défaut.
- **Enchaînement sans blanc** entre deux morceaux au même format.
- **VU-mètre**
  - Mesure ce qui sort réellement, après le volume.
  - Barre en niveau moyen avec l'inertie d'un vrai VU-mètre, repère de crête qui reste affiché un instant, et témoin d'écrêtage.
  - Échelle de −40 à 0 dB.
- **Grande forme d'onde couleur** façon Serato, cliquable pour se déplacer dans le morceau.

### 4.2 DSD
- Lecture des fichiers **DSF et DFF**, du DSD64 au DSD256 en DoP. Le DSD512 est lu par conversion PCM ou envoyé tel quel en DLNA.
- **DoP** (norme v1.1) vers les DAC compatibles, activé seulement quand c'est sûr. Le volume est verrouillé dans le moteur et un silence DSD est envoyé au démarrage et à l'arrêt, pour éviter tout claquement dans les enceintes.
- **Conversion DSD → PCM** de haute qualité : bruit à −123 dB dans la bande audible.

### 4.3 Streaming réseau hi-fi (DLNA / UPnP / OpenHome)
- Clic droit sur une sélection → « Lire sur un streamer réseau ».
- **Fichier envoyé tel quel**, jusqu'au 24/384, au 32 bits et au DSD256, sans conversion ni réduction de résolution.
- **OpenHome** pris en charge (Linn, Naim, Audiolab, Cambridge…) : la file d'attente est envoyée au streamer.
- **Enchaînement sans blanc** et déplacement dans le morceau depuis le streamer.
- **Format affiché sur le streamer**, par exemple « 24/192 FLAC », grâce aux métadonnées complètes.
- **Profil par appareil.** Si le streamer refuse un format, conversion FLAC sans perte, uniquement après confirmation. DoP en WAV en option.
- **Le Mac ne se met pas en veille** pendant la diffusion.

### 4.4 DJ Mixer
- **Deux platines** : lecture, CUE, pitch, **keylock** sans changement de hauteur.
- **SYNC** du tempo et de la phase, par un léger pitch bend sans saut audible ; gère le demi et le double tempo. Le deck que le public entend est signalé par le badge **MAÎTRE**.
- **8 hot cues**, **boucles de 1 à 16 temps** calées sur la grille, quantize (Q). Hot cues et boucles sont gardés avec le morceau.
- **Égaliseur 3 bandes** (graves, médiums, aigus) avec **KILL** par bande, le spectre du morceau étant affiché en fond.
- **Crossfader** à puissance constante, faders de voie, **transition automatique**.
- **Pré-écoute au casque** :
  - sur une seconde sortie (par exemple le mix sur le DAC, le casque sur la prise du Mac), avec compensation automatique du décalage entre les deux cartes ;
  - dosage casque/master et volume du casque ;
  - pré-écoute d'un morceau de la bibliothèque sans le charger sur une platine.
- **Formes d'onde couleur** des deux decks superposées, avec grille de temps, hot cues et boucle.
- **Latence** de 11 ms entre l'appui et le son (objectif : 20 ms).
- **Qualité** : morceaux gardés en 24 bits avec dither, mixage à 48 kHz, 96 kHz en option.
- **Relais avec la bibliothèque** : on passe de l'écoute au DJ Mixer sans arrêter la musique, le morceau continue sur la platine choisie (A ou B) au même endroit. L'inverse fonctionne aussi.
- **Changement de sortie** : si la sortie ne gère pas la fréquence de mixage (enceinte Bluetooth, par exemple), le moteur se rouvre à une fréquence compatible en gardant les morceaux et leur position.
- **Clé musicale cliquable**, qui ouvre Harmonic Mix filtré sur les morceaux compatibles.

### 4.5 Bibliothèque
- **Scan des dossiers** et surveillance en temps réel :
  - nouveaux fichiers indexés automatiquement ;
  - **fichiers renommés ou déplacés suivis avec toutes leurs données** : favoris, notes, BPM, hot cues, playlists, historique ;
  - fichiers supprimés retirés de la bibliothèque, mais **jamais quand un disque est simplement débranché**, et avec un garde-fou en cas de disparition massive.
- **Rapide** : 50 000 morceaux s'ouvrent en environ 100 ms, avec tri et recherche instantanés.
- **Affichage** : pochette ou initiales, titre et artiste, BPM, clé Camelot colorée, favori d'un clic, chargement direct sur la platine A ou B.
- **Filtres** par genre, format, clé et plage de BPM ; recherche avancée.
- **Édition des tags**, en préservant les données des autres logiciels DJ (Serato, Rekordbox, Traktor).

### 4.6 Analyse audio
- **BPM au millième et grille de temps** : premier temps, temps fort, indice de confiance, correction du demi et du double tempo selon le genre.
- **Tonalité** en notation Camelot, pour le mix harmonique.
- **ReplayGain** : 0,3 s par morceau, avec un écart de 0,01 dB par rapport aux outils de référence.
- Tout est calculé en arrière-plan, et les morceaux déjà présents sont rattrapés automatiquement.

### 4.7 Métadonnées et pochettes
- **Auto-Tagger MusicBrainz**
  - Recherche structurée (artiste et titre séparés), durée vérifiée, et choix de l'**album officiel de l'artiste** : jamais une compilation, un live ou « Various Artists ».
  - En essai réel : 27 albums justes sur 27 fichiers, contre 10 avant la refonte.
- **Enrichissement Discogs**, avec la clé d'application intégrée : rien à configurer.
- **Pochettes** via MusicBrainz et Cover Art Archive, jusqu'à 1200 px.

### 4.8 Organisation
- Playlists classiques et **Smart Playlists** à règles.
- Favoris, **Historique** d'écoute, **Nouveaux ajouts**.
- **Statistiques** : genres, répartition des BPM par tempo, formats avec la part sans perte, années, morceaux les plus écoutés.
- **Styles musicaux** et **Pochettes** en grilles.
- **Harmonic Mix** : roue de Camelot interactive.

### 4.9 Outils
- **Doublons** : détection et vérification.
- **Nettoyage** de la bibliothèque.
- **Conversion de formats** bit à bit vers WAV, AIFF et FLAC, haute résolution comprise, plus MP3 et Ogg. La qualité d'origine est toujours gardée.
- **Export DJ**.
- **Transfert automatique** des téléchargements vers la bibliothèque.

### 4.10 Intégration Mac et confort
- Interface **musica v2** : sobre, sombre, icônes au trait, fenêtre redimensionnable et plein écran, barre de titre intégrée.
- **Raccourcis clavier** :
  - Espace pour lecture et pause ;
  - flèches pour reculer ou avancer de 10 s (30 s avec Maj) ;
  - Cmd + flèches pour le morceau précédent ou suivant et pour le volume.
- **Touches média** du clavier et widget « À l'écoute » du centre de contrôle macOS.
- **Licences tierces** consultables dans l'app (menu Aide).

---

## 5. Visuels

Les captures existent déjà dans le dépôt de l'app, sur une base de démonstration sans données personnelles :

| Usage | Fichier (dépôt `MusicManager`) |
| --- | --- |
| Hero / bibliothèque | `docs/captures/160-design-bibliotheque/` et `docs/captures/160-design-coque/` (version « après ») |
| Lecteur et VU-mètre | `docs/captures/160-design-lecteur/`, `vu-metre-etats.png` |
| DJ Mixer | `docs/captures/160-dj-mixer/` (version « après », en 1920×1200) |
| Forme d'onde couleur | `docs/captures/153-onde-couleurs/` (version « après ») |
| Vues secondaires | `docs/captures/160-design-vues-ab/`, `docs/captures/160-design-vues-cde/` |
| Briques et couleurs | `docs/captures/160-design-socle/planche-briques.png` |

Pour régénérer des captures propres en haute définition :

```bash
cd ~/Github/MusicManager && uv run python scripts/apercu_ui.py --sortie captures_site
```

Les images actuelles du modèle (`web/public/Device-*.png`, `iphone.png`) montrent un téléphone. Il faut les remplacer par un cadre de MacBook ou par des fenêtres macOS.

**Couleurs du site, alignées sur l'app :**

| Rôle | Couleur |
| --- | --- |
| Fonds | `#121416`, `#1A1D20`, `#24282C` |
| Texte | `#E6E9EB`, puis `#98A1A7` pour le secondaire |
| Accent (deck A) | cyan `#35B2C4` |
| Deck B | terre cuite `#D08B6C` |
| Forme d'onde | rouge pour les graves, vert pour les médiums, bleu pour les aigus |

Police système (SF Pro sur Mac) ou Inter, comme dans le modèle.

---

## 6. FAQ

- **Qu'est-ce que « bit-perfect » ?**
  Les échantillons de votre fichier arrivent à la carte son sans aucune modification : ni rééchantillonnage, ni volume logiciel, ni effet. L'app affiche en permanence si c'est le cas, et sinon pourquoi.

- **Quels formats sont lus ?**
  FLAC, WAV, AIFF, ALAC, MP3, AAC, Ogg Vorbis, jusqu'à 32 bits / 768 kHz, et le DSD en DSF et DFF. Les formats Opus et WMA ne sont pas encore lus.

- **Faut-il un DAC ?**
  Non. L'app s'adapte à la sortie du Mac, à un DAC USB, à un appareil HDMI ou à un streamer réseau, et montre la qualité réellement obtenue.

- **Et le Bluetooth ?**
  Il fonctionne, mais le Bluetooth compresse toujours le son. L'app le signale honnêtement.

- **Mon streamer est compatible ?**
  Tout streamer DLNA/UPnP l'est. Ceux qui gèrent OpenHome (Linn, Naim, Audiolab, Cambridge…) reçoivent la file d'attente complète.

- **Puis-je mixer avec ?**
  Oui : deux platines, SYNC, keylock, hot cues, boucles, égaliseur et pré-écoute au casque.

- **Mes repères Serato, Rekordbox ou Traktor sont-ils conservés ?**
  Oui, l'app ne touche pas aux données des autres logiciels quand elle écrit des tags.

- **Sur quels systèmes ?**
  Mac (Apple Silicon) au lancement. Windows et Linux arrivent plus tard.

---

## 7. À ne pas promettre

- Une date ou des fonctionnalités pour Windows et Linux (seulement « coming soon »), ni l'iPhone.
- Le DSD natif sur Mac : c'est le DoP, ou une conversion PCM.
- Le 32 bits bit-perfect sur Mac : 24 bits effectifs.
- La lecture des formats Opus et WMA.
- La lecture qui continue quand l'app est fermée avec OpenHome : pas encore.
- Une compatibilité avec des contrôleurs DJ matériels : rien n'est prévu pour l'instant.
- Une date de sortie, des prix définitifs (seulement indicatifs) ou des témoignages inventés.

---

## 8. Remplir `web/src/lib/config.tsx`

| Clé | Contenu |
| --- | --- |
| `name` | Le nom choisi (section 1) |
| `description` | La phrase de positionnement (section 2) |
| `keywords` | Les mots-clés de la section 2 |
| `features` | Six cartes : Hi-fi bit-perfect, DSD, Streaming DLNA/OpenHome, DJ Mixer, Analyse et tags, Bibliothèque |
| `featureHighlight` | Les trois arguments de la section 3 |
| `bento` | Les quatre cartes de la section 3 |
| `benefits` | Les bénéfices de la section 3 |
| `faqs` | La section 6 |
| `pricing` | Montants indicatifs, présentés comme provisoires (section 1) |
| `testimonials` | Vide tant qu'il n'y a pas de vraies citations |
| `platforms` | macOS au lancement, Windows et Linux « coming soon » |
| `links` | Contact (à venir), GitHub si le dépôt devient public (décision de Bastien) |

Les icônes du modèle sont dans `components/icons.tsx`. L'app utilise Lucide : `lucide-react` donne les mêmes pictogrammes.
