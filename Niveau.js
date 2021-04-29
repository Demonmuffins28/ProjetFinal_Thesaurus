
function initNiveau() {
    let tabObjets3D = new Array();

    for (i=0; i< tabJeu.length; i++) {
        for (j = 0; j < tabJeu[i].length; j++) {
            
            if (tabJeu[i][j] == 'R') {
                const objMurOuvrable = creerObj3DMur(objgl, TEX_MUR_OUVRABLE, j, i, true);
                tabObjets3D.push(objMurOuvrable);
            }
            if (tabJeu[i][j] == 'V') {
                const objMurNonOuvrable = creerObj3DMur(objgl, TEX_MUR_OUVRABLE, j, i, false);
                tabObjets3D.push(objMurNonOuvrable);
            }
        }
    }
    return tabObjets3D;
}


function gestionNiveaux(){
    tempsJeu(); 
    passerNiveauSuperieur();
    recommencerNiveau();
    gameOver();
    document.getElementById('ui').innerHTML = "Score : "+ intScoreNiveau +"    Temps: " + strTempsNiveau + " Nb ouvreur de murs : " + intNbOuvreurMur;
}

function tempsJeu(){
    let objDate2 = new Date()
    if (binDemarrer){
        intTempsEcoulerMs += objDate2 - objDate
        intSeconde = 60 - Math.floor(intTempsEcoulerMs * 0.001);
        strTempsNiveau = ("0" + intSeconde).slice(-2)
    }
    objDate = objDate2
}

function trouverCoffre(){
    return Math.floor(getPositionCameraX(objScene3D.camera)) == tabPosCoffre[intNiveau-1].intX && 
           Math.floor(getPositionCameraZ(objScene3D.camera)) == tabPosCoffre[intNiveau-1].intZ;
}

function passerNiveauSuperieur(){
    if (trouverCoffre()){
        intScoreNiveau += 10 * intSeconde; 
        strTempsNiveau = "60";
        intTempsEcoulerMs = 0;
        binEnMouvement = false;
        binDemarrer = false;
        intNiveau++;
        objScene3D = initScene3D(objgl);
    }
    if (intNiveau == 11)
        arreterAnimation();
}

function recommencerNiveau(){
    if (intSeconde == 0 && intScoreNiveau > 200){
        intTempsEcoulerMs = 0;
        strTempsNiveau = "60";
        intScoreNiveau -= 200;
        binEnMouvement = false;
        binDemarrer = false;
        objScene3D = initScene3D(objgl);
    }
}

function gameOver(){
    if (intSeconde == 0 && intScoreNiveau < 200){
        alert("Game Over");
        arreterAnimation();
    }
}

// // V = non-ouvrable, R = ouvrable, T = tresors, ' ' = corridor
// const tabJeu = 
// [
//     ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'R', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', ' ', ' ', 'R', ' ', 'R', ' ', 'R', ' ', ' ', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', 'R', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'R', 'R', ' ', 'R', 'R', ' ', 'R', ' ', 'R', 'R', ' ', 'R', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', 'R', 'R', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', 'R', 'R', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', 'R', 'R', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', 'R', 'R', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', 'R', 'R', 'R', 'R', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'V', 'V', ' ', 'V', 'V', ' ', 'R', 'R', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'V', 'T', 'T', 'T', 'V', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', 'V', 'T', 'T', 'T', 'V', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', 'R', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'V', 'T', 'T', 'T', 'V', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', 'V', 'V', 'V', 'V', 'V', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'V'],
//     ['V', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'V'],
//     ['V', ' ', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'R', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'V'],
//     ['V', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', ' ', 'R', ' ', 'R', ' ', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', 'V'],
//     ['V', ' ', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'R', 'R', ' ', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', 'R', ' ', ' ', ' ', 'R', ' ', ' ', ' ', 'R', ' ', ' ', ' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', ' ', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', ' ', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'R', ' ', ' ', ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', ' ', 'R', ' ', 'R', 'R', ' ', 'R', ' ', 'R', 'R', 'R', ' ', 'R', 'R', ' ', 'R', 'R', ' ', 'R', 'R', 'R', ' ', 'R', ' ', 'R', 'R', ' ', 'R', ' ', 'V'],
//     ['V', ' ', 'R', ' ', 'R', ' ', ' ', 'R', ' ', 'R', ' ', ' ', ' ', 'R', ' ', ' ', ' ', 'R', ' ', ' ', ' ', 'R', ' ', 'R', ' ', ' ', 'R', ' ', 'R', ' ', 'V'],
//     ['V', 'R', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', ' ', 'R', ' ', 'R', 'R', 'R', 'R', ' ', 'R', 'R', 'V'],
//     ['V', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'V'],
//     ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
// ]


