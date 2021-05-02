/**
 * Classe contenant tous les effets sonores du jeux
 */

function initSons() {
    let objSons = new Object();

    //DebutNiveauSFX
    let objSon = document.createElement('audio');
    objSon.setAttribute('src', 'ressources/sons/sfx/DebutNiveauSFX.mp3');
    objSon.load();
    objSons.levelStartSFX = objSon;

    //FinNiveauSFX
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'ressources/sons/sfx/FinNiveauSFX.mp3');
    objSon.load();
    objSons.levelCompleteSFX = objSon;

    //TempsEcoulerSFX
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'ressources/sons/sfx/TempsEcoulerSFX.mp3');
    objSon.load();
    objSons.timeOutSFX = objSon;

    //OuvrireMurSFX
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'ressources/sons/sfx/ouvrirMurSFX.mp3');
    objSon.load();
    objSon.volume = 0.3;
    objSons.detruireMurSFX = objSon;

    //teleportationSFX
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'ressources/sons/sfx/teleportationSFX.mp3');
    objSon.load();
    objSons.teleportationSFX = objSon;

    //FinDePartieSFX
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'ressources/sons/sfx/FinDePartieSFX.mp3');
    objSon.load();
    objSon.volume = 0.3;
    objSons.gameOverSFX = objSon;

    //CompleterJeuSFX
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'ressources/sons/sfx/CompleterJeuSFX.mp3');
    objSon.load();
    objSon.volume = 0.3;
    objSons.gameCompleteSFX = objSon;

    return objSons;
}