/**
 * Fonctions pour bouger la camera en utilisant le clavier ou/et la souris
 */

function mouvementCameraAvecSouris(event) {
  let fltX;
  let fltZ;
  let intDirection;
  let fltAngle;
  let fltXPrime; 
  let fltZPrime;

  const camera = objScene3D.camera;

  // Position de la souris en mouvement
  let newPositionSourisX = event.clientX;
  // La différence de mouvement (+/-)
  let movementX = newPositionSourisX - positionSourisX;

  // Ajuster la position precedante
  positionSourisX = newPositionSourisX;

  // Ajuster la camera pour la faire tourner de gauche a droite
  fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
  fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
  intDirection = (movementX >= 0) ? 1 : -1;
  fltAngle = intDirection * 0.6 * Math.PI / 90; // Tourner 0.6 degrés
  fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
  fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
  setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
  setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);                

  effacerCanevas(objgl);
  dessiner(objgl, objProgShaders, objScene3D); 
  
  // Afficher la souris quand on sort du canavas (pas capable de contenir la souris 
  // dans le canvas a cause quon utilise internet exploreur)
  if (positionSourisX > objCanvas.width || positionSourisX < 10) {
      // cacher la souris
      document.body.style.cursor = 'auto';
      binTournerCamera = false;
  } else {
      // reafficher la souris
      document.body.style.cursor = 'none';
  }
}

function deplacerCameraClavier(event) {
  if (!binVueAerienne && !binGameOver){
    switch (event.keyCode) {

      //Rotation vers la droite("D" ou "→")
      case 39: case 68:
          binMovDroit = true;
          binEnMouvement = true;   
          break

      //Rotation vers la gauche("A" ou "←")
      case 37: case 65:
          binMovGauche = true;
          binEnMouvement = true;
          break

      //Avancer("W" ou "↑")
      case 38: case 87:
          binMovAvant = true;
          binEnMouvement = true;
          break

      //Reculer("S" ou "↓")
      case 40: case 83:
          binMovArriere = true;
          binEnMouvement = true;
          break

      //Détruire un mur("espace")
      case 32:
        if (intNbOuvreurMur != 0 && intScoreNiveau >= 50)
          destruireMur(objScene3D.camera.objAutourJoueur.objEnAvantJoueurFar.intX, objScene3D.camera.objAutourJoueur.objEnAvantJoueurFar.intZ);
        break;
    }
  }
}

function arretCameraClavier(event) {
  switch (event.keyCode) {
    case 39:
    case 68:
        binMovDroit = false;
        binEnMouvement = false;
        break
    case 37:
    case 65:
        binMovGauche = false;
        binEnMouvement = false;
        break
    case 38:
    case 87:
        binMovAvant = false;
        binEnMouvement = false;
        break
    case 40:
    case 83:
        binMovArriere = false;
        binEnMouvement = false;
        break
  }
}

function deplacerCamera() {
  const camera = objScene3D.camera;

  let fltX;
  let fltZ;
  let intDirection;
  let fltAngle;
  let fltXPrime; 
  let fltZPrime;
  let fltRayon;

  //if (event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 65 || event.keyCode == 68) {
  if (binMovDroit || binMovGauche) {    
    // 37:  Flèche-à-gauche; 39:Flèche-à-droite
    fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
    intDirection = (binMovGauche) ? -1 : 1;
    fltAngle = intDirection * 4 * Math.PI / 90; // Tourner 2 degrés
    fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
    fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);

    setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
    setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);   
  }  
  if (binMovAvant) {    
    let intCollision = validerCollision();
    if (intCollision != 1) {
      // 38:  Flèche-en-haut; 40:Flèche-en-bas
      fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
      fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
      fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
      intDirection = 1;

      fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
      fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

      setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
      setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
      setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
      setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    } 
  } else if (binMovArriere) {
      let intCollision = validerCollision();
      if (intCollision != 2) {
        fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
        intDirection = -1;

        fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
        fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

        setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
        setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
        setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
        setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
      }
    }

  effacerCanevas(objgl);
  dessiner(objgl, objProgShaders, objScene3D);
}

function validerCollision() {
  // 1=avant 2=arriere 0=aucune
  let intAucuneCollision = 0;
  const AV_FAR = objScene3D.camera.objAutourJoueur.objEnAvantJoueurFar;
  const AV = objScene3D.camera.objAutourJoueur.objEnAvantJoueur;
  const POS = objScene3D.camera.objAutourJoueur.objAPosJoueur;
  const AR_FAR = objScene3D.camera.objAutourJoueur.objEnArriereJoueurFar;
  const AR = objScene3D.camera.objAutourJoueur.objEnArriereJoueur;

  if ((AV_FAR.strType == "R" || AV_FAR.strType == "V") || (AV.strType == "R" || AV.strType == "V")) {
    if (Math.abs(POS.intX - AV_FAR.intX + 1) <= 0.5 || Math.abs(POS.intZ - (AV_FAR.intZ + 1)) <= 0.5) {
        intAucuneCollision = 1;
    }  else if (Math.abs(POS.intX - AV_FAR.intX) <= 0.5 || Math.abs(POS.intZ - AV_FAR.intZ) <= 0.5) {
        intAucuneCollision = 1;
    }
  } else if ((AR_FAR.strType == "R" || AR_FAR.strType == "V") || (AR.strType == "R" || AR.strType == "V")) {
    if (Math.abs(POS.intX - AR_FAR.intX + 1) <= 0.5 || Math.abs(POS.intZ - (AR_FAR.intZ + 1)) <= 0.5 ) {
        intAucuneCollision = 2;
    }  else if (Math.abs(POS.intX - AR_FAR.intX) <= 0.5 || Math.abs(POS.intZ - AR_FAR.intZ) <= 0.5 ) {
        intAucuneCollision = 2;
    } 
  }
  // si en colision avec un tele-transporteur
  else if (AV.strType == "P") {
    teleporter(Math.floor(POS.intX), Math.floor(POS.intZ));    
  }

  return intAucuneCollision;
}


function teleporter(intX, intZ) {
  let cibleYRecept = getCibleCameraY(objScene3D.camera);
  let regardeOuestOuNord = -30;
  let regardeEstOuSud = 60;

  for (let i = 0; i < tabIdTranspo.length; i++) {
    if (objScene3D.tabObjets3D[tabIdTranspo[i]].intX == intX + 0.5 && objScene3D.tabObjets3D[tabIdTranspo[i]].intZ == intZ + 1.5) {
      let indexRandom = Math.floor(Math.random() * tabIdRecept.length);
      setPositionsCameraXYZ([objScene3D.tabObjets3D[tabIdRecept[indexRandom]].intX, getPositionCameraY(objScene3D.camera), objScene3D.tabObjets3D[tabIdRecept[indexRandom]].intZ], objScene3D.camera);

      let nouvCibleZ = objScene3D.tabObjets3D[tabIdRecept[indexRandom]].intZ + Math.abs((objScene3D.tabObjets3D[tabIdTranspo[i]].intZ - getCibleCameraZ(objScene3D.camera)));
      let nouvCibleX = objScene3D.tabObjets3D[tabIdRecept[indexRandom]].intX + Math.abs((objScene3D.tabObjets3D[tabIdTranspo[i]].intX - getCibleCameraX(objScene3D.camera)));
      setCiblesCameraXYZ([nouvCibleX, cibleYRecept, nouvCibleZ], objScene3D.camera);
      
      // switch (i) {
      //   // si on veux regarder vers le nord
      //   case 8: case 2: case 7:
      //     setCiblesCameraXYZ([objScene3D.tabObjets3D[tabIdRecept[indexRandom]].intX , cibleYRecept, regardeOuestOuNord], objScene3D.camera);
      //     break;
      //   // Si on veux regarder vers l'est
      //   case 5: case 0: case 3:
      //     setCiblesCameraXYZ([regardeEstOuSud, cibleYRecept, objScene3D.tabObjets3D[tabIdRecept[indexRandom]].intZ], objScene3D.camera);
      //     break;
      //   // Si on veux regarder vers l'ouest
      //   case 1: case 6: case 8: case 4:
      //     setCiblesCameraXYZ([regardeOuestOuNord, cibleYRecept, objScene3D.tabObjets3D[tabIdRecept[indexRandom]].intZ], objScene3D.camera);
      //     break;
      // }
      
    }    
  }  
}
