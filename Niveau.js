

function initNiveau(tabObjets3D) {
    updateTabJeu();
    let tabObjets3DNiveau = new Array();

    for (i=0; i< tabJeu.length; i++) {
        for (j = 0; j < tabJeu[i].length; j++) {
            
            if (tabJeu[i][j] == 'R') {
                const objMurOuvrable = creerObj3DMur(objgl, TEX_MUR_OUVRABLE, j, i, true);
                tabObjets3DNiveau.push(objMurOuvrable);
            }
            if (tabJeu[i][j] == 'V') {
                const objMurNonOuvrable = creerObj3DMur(objgl, TEX_MUR_OUVRABLE, j, i, false);
                tabObjets3DNiveau.push(objMurNonOuvrable);
            }
            // Pour tele-transporteur
            if (tabJeu[i][j] == 'P') {
                const obj3DTranspo = creerObj3DTransporteur(objgl, j, i, TEX_TRANSP, tabObjets3D.length + tabObjets3DNiveau.length);
                tabIdTranspo.push(tabObjets3D.length + tabObjets3DNiveau.length);
                tabObjets3DNiveau.push(obj3DTranspo);
            }
            // Pour tele-recepteur
            if (tabJeu[i][j] == 'M') {
                const obj3DRecept = creerObj3DRecepteur(objgl, j, i, TEX_TRANSP, tabObjets3D.length + tabObjets3DNiveau.length);
                tabIdRecept.push(tabObjets3D.length + tabObjets3DNiveau.length);
                tabObjets3DNiveau.push(obj3DRecept);
            }
        }
    }
    return tabObjets3DNiveau;
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
