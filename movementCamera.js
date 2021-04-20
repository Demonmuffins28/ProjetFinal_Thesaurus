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
  fltAngle = intDirection * .6 * Math.PI / 90; // Tourner 0.6 degrés
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
  if (!binVueAerienne){
    switch (event.keyCode) {
      case 39:
      case 68:
          binMovDroit = true;
          binEnMouvement = true;   
          break
      case 37:
      case 65:
          binMovGauche = true;
          binEnMouvement = true;
          break
      case 38:
      case 87:
          binMovAvant = true;
          binEnMouvement = true;
          break
      case 40:
      case 83:
          binMovArriere = true;
          binEnMouvement = true;
          break
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
    fltAngle = intDirection * 2 * Math.PI / 90; // Tourner 2 degrés
    fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
    fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
    setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
    setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
  }
  if (binMovAvant || binMovArriere) {
    // 38:  Flèche-en-haut; 40:Flèche-en-bas
    fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
    fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
    fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
    intDirection = (binMovAvant) ? 1 : -1;

    fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
    fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

    setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
    setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
    setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
    setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
  }

  effacerCanevas(objgl);
  dessiner(objgl, objProgShaders, objScene3D);
}