"""Captures pour le site : DJ Mixer avec deux morceaux chargés et Bibliothèque en lecture.

À copier dans scripts/ du dépôt de l'app (~/Github/MusicManager) et lancer de là :
    QT_SCALE_FACTOR=2 uv run python scripts/captures_site.py <dossier>

Réutilise l'environnement isolé de apercu_ui (HOME temporaire, Qt offscreen) et
génère deux WAV synthétiques (house à 124 / 126 BPM) pour que les platines
aient de vraies formes d'onde.
"""

import os
import sys
import wave
from pathlib import Path

os.environ.setdefault("MM_AUDIO_OFFLINE", "1")
sys.path.insert(0, str(Path(__file__).resolve().parent))

import apercu_ui as base  # noqa: E402  (redirige HOME avant tout import de l'app)
import numpy as np  # noqa: E402

SR = 44_100


def morceau(bpm: float, duree: float, graine: int, note: float) -> np.ndarray:
    """Kick, charley, basse et nappe, avec des sections (intro, break, drop)."""
    alea = np.random.default_rng(graine)
    n = int(duree * SR)
    t = np.arange(n) / SR
    beat = 60 / bpm
    phase = (t % beat) / beat
    num_beat = (t // beat).astype(int)
    mesure = num_beat // 16

    # Kick : sinus qui descend en fréquence, enveloppe courte
    env_k = np.exp(-phase * beat * 18)
    kick = np.sin(2 * np.pi * (45 + 90 * np.exp(-phase * beat * 30)) * phase * beat) * env_k

    # Charley sur les contretemps
    phase_c = ((t + beat / 2) % beat) / beat
    hat = alea.standard_normal(n) * np.exp(-phase_c * beat * 60) * 0.25

    # Basse sur les contretemps, nappe lente
    basse = np.sin(2 * np.pi * note * t) * np.exp(-phase_c * beat * 6) * 0.5
    nappe = (np.sin(2 * np.pi * note * 4 * t) + np.sin(2 * np.pi * note * 5.04 * t)) * 0.08
    nappe *= 0.5 + 0.5 * np.sin(2 * np.pi * t / (beat * 16))

    # Structure : intro (kick + charley), break (nappe seule), drop (tout)
    sec = mesure % 8
    k_on = np.where((sec == 4) | (sec == 5), 0.0, 1.0)
    b_on = np.where(sec < 2, 0.0, 1.0) * k_on
    # Accords en stabs sur le troisième temps de chaque mesure : du médium
    phase_m = (t % (beat * 4)) / (beat * 4)
    stab = sum(np.sign(np.sin(2 * np.pi * note * m * t)) for m in (6, 7.56, 9)) * 0.06
    stab *= np.exp(-np.clip(phase_m - 0.5, 0, None) * beat * 4 * 9) * (phase_m >= 0.5)
    signal = stab * b_on + kick * 0.9 * k_on + hat * k_on + basse * b_on + nappe * (1.4 - 0.6 * k_on)
    signal /= np.max(np.abs(signal)) * 1.1
    return signal.astype(np.float32)


def ecrire_wav(chemin: Path, signal: np.ndarray):
    stereo = np.repeat((signal * 32767).astype("<i2")[:, None], 2, axis=1)
    with wave.open(str(chemin), "wb") as f:
        f.setnchannels(2)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes(stereo.tobytes())


def main():
    sortie = Path(sys.argv[1])
    sortie.mkdir(parents=True, exist_ok=True)

    from PySide6.QtCore import QCoreApplication, QSettings
    from PySide6.QtWidgets import QApplication

    QSettings.setDefaultFormat(QSettings.Format.IniFormat)
    QSettings.setPath(
        QSettings.Format.IniFormat, QSettings.Scope.UserScope, str(base._HOME_DEMO / "reglages")
    )
    from musicmanager import app as app_module

    app = QApplication.instance() or QApplication([sys.argv[0]])
    QCoreApplication.setApplicationName("MusicManager")
    app_module.preparer_application(app)

    musique = base._HOME_DEMO / "Music 2026"
    pistes = base.remplir_base_demo([musique, base._HOME_DEMO / "Vinyles", base._HOME_DEMO / "Promos"])

    from musicmanager.data import tracks as tracks_repo

    vraies = []
    for i, (titre, artiste, bpm, cle, note, graine) in enumerate(
        [
            ("Nuit Blanche", "Motorbass", 124.0, "8A", 55.0, 7),
            ("Soleil Tardif", "Marcel & Jules", 126.0, "9A", 61.7, 11),
        ]
    ):
        chemin = musique / f"{artiste} - {titre}.wav"
        ecrire_wav(chemin, morceau(bpm, 150, graine, note))
        data = {
            "filepath": str(chemin),
            "filename": chemin.name,
            "title": titre,
            "artist": artiste,
            "album": "Démo",
            "genre": "House",
            "year": 2026,
            "bpm": bpm,
            "duration": 150.0,
            "file_size": chemin.stat().st_size,
            "format": "WAV",
            "bitrate": 1_411_200,
            "samplerate": SR,
            "channels": 2,
            "key_camelot": cle,
            "cover_path": pistes[i * 3]["cover_path"] if pistes[i * 3].get("cover_path") else None,
        }
        vraies.append(tracks_repo.get(tracks_repo.upsert(data)))

    from musicmanager.ui.main_window import MainWindow

    window = MainWindow()
    window.resize(1280, 860)
    window.show()
    base._attendre(app, 1.0)

    # Bibliothèque : un morceau « en cours » dans la barre de lecture
    base._maquette_lecteur(window, vraies[0])
    window._goto(base.VUES["bibliotheque"])
    base._attendre(app, 1.5)
    window.grab().save(str(sortie / "bibliotheque-lecture.png"))
    print("✓ bibliotheque-lecture")

    for deck, piste in zip("AB", vraies):
        ok = window.dj_view.deck(deck).load_track(piste, position=48.0 if deck == "A" else 63.0)
        print(f"deck {deck} chargé : {ok}")
    window._goto(base.VUES["dj-mixer"])
    base._attendre(app, 12.0)  # analyse des formes d'onde en tâche de fond
    window.grab().save(str(sortie / "dj-mixer-charge.png"))
    print("✓ dj-mixer-charge")
    window.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
