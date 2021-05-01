
// Le niveau actuel du jeu
let intNiveau = 1;
let intScoreNiveau = 300
let intTempsEcoulerMs = 0
let strTempsNiveau = "60";
let intSeconde = 60;
let binDemarrer = false
let objDate = new Date();
let intSecondeVueAerienne = 0;
let intScoreDebutVueAerienne = 0;
let intNbOuvreurMur = 0;

let tabIndexMur = [];
let tabIdTranspo = [];


function initNiveau(tabObjets3D) {
    genererTabJeu()
    updateTabJeu();
    let tabObjets3DNiveau = new Array();

    for (i=0; i< tabJeu.length; i++) {
        for (j = 0; j < tabJeu[i].length; j++) {
            
            if (tabJeu[i][j] == 'R') {
                const objMurOuvrable = creerObj3DMur(objgl, TEX_MUR_OUVRABLE, j, i, true);
                tabIndexMur.push(tabObjets3D.length + tabObjets3DNiveau.length);
                tabObjets3DNiveau.push(objMurOuvrable);
            }
            if (tabJeu[i][j] == 'V') {
                const objMurNonOuvrable = creerObj3DMur(objgl, TEX_MUR_OUVRABLE, j, i, false);
                tabIndexMur.push(tabObjets3D.length + tabObjets3DNiveau.length);
                tabObjets3DNiveau.push(objMurNonOuvrable);
            }
            // Pour tele-transporteur
            if (tabJeu[i][j] == 'P') {
                const obj3DTranspo = creerObj3DTransporteur(objgl, j, i, TEX_TRANSPO, tabObjets3D.length + tabObjets3DNiveau.length);
                tabIdTranspo.push(tabObjets3D.length + tabObjets3DNiveau.length);
                tabObjets3DNiveau.push(obj3DTranspo);
            }
        }
    }
    //console.ietable(tabObjets3DNiveau);
    return tabObjets3DNiveau;
}

// Pour print un tableau en console sur IE
console.ietable = function(data, columns) {
  if (data.constructor === Object) {
    if (typeof columns != "object") {
      var columns = [];
      for (var index in data) {
        for (var prop in data[index]) {
          if (columns.indexOf(prop) == -1) {
            columns.push(prop);
          }
        }
      }
    } else {
      var header = "index" 
      for (var p in columns) {
        header += " | ";
        header += columns[p];
      }
      console.log(header);
    }

    for (var obj in data) {
      var entry = data[obj];
      var entryStr = obj+"";
      for (var j = 0; j < columns.length; j++) {
        entryStr += " | ";
        entryStr += entry[columns[j]];
      }
      console.log(entryStr);
    }

  } else if (data.constructor === Array) {
    if (typeof columns != "object") {
      var columns = [];
      for (var index in data) {
        for (var prop in data[index]) {
          if (columns.indexOf(prop) == -1) {
            columns.push(prop);
          }
        }
      }
    } else {
      var header = "index" 
      for (var p in columns) {
        header += " | ";
        header += columns[p];
      }
      console.log(header);
    }

    for (var i = 0; i < data.length; i++) {
      var entry = data[i];
      var entryStr = i+"";
      for (var j = 0; j < columns.length; j++) {
        entryStr += " | ";
        entryStr += entry[columns[j]];
      }
      console.log(entryStr);
    }
  }
}

function gestionNiveaux(){
    tempsJeu();
    gestionScoreVueAerienne();
    passerNiveauSuperieur();
    recommencerNiveau();
    gameOver();
    document.getElementById('ui').innerHTML = "Score: "+ intScoreNiveau + repeatString("&nbsp;", 25) + "Temps: " + strTempsNiveau +  repeatString("&nbsp;", 25) +"Ouvreur de murs: " + intNbOuvreurMur;
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

function initVar(){
    binTournerCamera = false;
    binMovAvant = false;
    binMovArriere = false;
    binMovDroit = false;
    binMovGauche = false;
    binVueAerienne = false;
    binBloquerVueAerienne = false;
    binTricher = false;
    binEnMouvement = false;

    objDate = new Date();
    intSecondeVueAerienne = 0;
    intScoreDebutVueAerienne = 0;
    intNbOuvreurMur = 0;

    tabIndexMur = [];
    tabIdTranspo = [];
}

function trouverCoffre(){
    return Math.floor(getPositionCameraX(objScene3D.camera)) == tabPosCoffre[intNiveau-1].intX && 
           Math.floor(getPositionCameraZ(objScene3D.camera)) == tabPosCoffre[intNiveau-1].intZ;
}

function passerNiveauSuperieur(){
    if (trouverCoffre()){
        intScoreNiveau += 10 * intSeconde; 
        strTempsNiveau = "60";
        intSeconde = 60;
        intTempsEcoulerMs = 0;
        binEnMouvement = false;
        binDemarrer = false;
        intNiveau++;
        initVar();
        objScene3D = initScene3D(objgl);
    }
    if (intNiveau == 11)
        arreterAnimation();
}

function recommencerNiveau(){
    if (intSeconde == 0 && intScoreNiveau >= 200){
        intTempsEcoulerMs = 0;
        strTempsNiveau = "60";
        intSeconde = 60;
        intScoreNiveau -= 200;
        binEnMouvement = false;
        binDemarrer = false;
        initVar();
        objScene3D = initScene3D(objgl);
    }
}

function gestionScoreVueAerienne(){
  if (binVueAerienne){
    intScoreNiveau = intScoreDebutVueAerienne - ((intSecondeVueAerienne - intSeconde) * 10);
    if (intScoreNiveau < 10){
      binVueAerienne = false;
      retourVueJoueur()
      binBloquerVueAerienne = true;
    }
  }
}

function gameOver(){
    if (intSeconde == 0 && intScoreNiveau < 200){
        alert("Game Over");
        arreterAnimation();
    }
}

function repeatString(strStringARepeter, intNbFois){
  strStringRepeter = "";
  for (i = 0; i<intNbFois; i++){
    strStringRepeter += strStringARepeter;
  }
  return strStringRepeter;
}
