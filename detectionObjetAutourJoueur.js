function detectionObjetAutourJoueur() {
  let intX = getPositionCameraX(objScene3D.camera);
  let intZ = getPositionCameraZ(objScene3D.camera);

  fltX = getCibleCameraX(objScene3D.camera) - getPositionCameraX(objScene3D.camera);
  fltZ = getCibleCameraZ(objScene3D.camera) - getPositionCameraZ(objScene3D.camera);
  fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);

  // Si primeX = 0 && primeZ = 1 -> Nord
  // Si primeX = 0 && primeZ = -1 -> Sud
  // Si primeX = -1 && primeZ = 0 -> Est
  // Si primeX = 1 && primeZ = 0 -> Ouest
  fltXPrime = 0.25 * Math.cos(Math.acos(fltX / fltRayon));
  fltZPrime = 0.25 * Math.sin(Math.asin(fltZ / fltRayon));
  fltXPrimeFar = 1 * Math.cos(Math.acos(fltX / fltRayon));
  fltZPrimeFar = 1 * Math.sin(Math.asin(fltZ / fltRayon));


  //document.getElementById('primeCamX').innerHTML = "primeX : " + fltXPrime;
  //document.getElementById('primeCamZ').innerHTML = "primeZ : " + fltZPrime;

  // Pour savoir dans quelle direction quon regarde
  let strDirection = "";
  if (fltZPrimeFar > 0.5 && fltZPrimeFar < 1) strDirection = "Sud";
  else if (fltZPrimeFar < -0.5 && fltZPrimeFar > -1) strDirection = "Nord";
  else if (fltXPrimeFar > 0.5 && fltXPrimeFar < 1) strDirection = "Est";
  else if (fltXPrimeFar < -0.5 && fltXPrimeFar > -1) strDirection = "Ouest";
  //document.getElementById('Direction').innerHTML = "direction: " + strDirection;

  objScene3D.camera.objAutourJoueur = {
      objAPosJoueur: {
          strType: tabJeu[Math.floor(intZ)][Math.floor(intX)],
          intX: intX * INT_CELL_LARGEUR,
          intZ: intZ * INT_CELL_PROFONDEUR,
      },
      objEnAvantJoueur: {
          strType: tabJeu[Math.floor(intZ+fltZPrime)][Math.floor(intX+fltXPrime)],
          intX: Math.floor(intX + fltXPrime * INT_CELL_LARGEUR),
          intZ: Math.floor(intZ + fltZPrime * INT_CELL_PROFONDEUR),
      },
      objEnArriereJoueur: {
          strType: tabJeu[Math.floor(intZ-fltZPrime)][Math.floor(intX-fltXPrime)],
          intX: Math.floor(intX - fltXPrime * INT_CELL_LARGEUR),
          intZ: Math.floor(intZ - fltZPrime * INT_CELL_PROFONDEUR),
      },
      objEnAvantJoueurFar: {
        strType: tabJeu[Math.floor(intZ+fltZPrimeFar)][Math.floor(intX+fltXPrimeFar)],
        intX: Math.floor(intX + fltXPrimeFar * INT_CELL_LARGEUR),
        intZ: Math.floor(intZ + fltZPrimeFar * INT_CELL_PROFONDEUR),
      },
      objEnArriereJoueurFar: {
        strType: tabJeu[Math.floor(intZ-fltZPrimeFar)][Math.floor(intX-fltXPrimeFar)],
        intX: Math.floor(intX - fltXPrimeFar * INT_CELL_LARGEUR),
        intZ: Math.floor(intZ - fltZPrimeFar * INT_CELL_PROFONDEUR),
      },
  }        
  
  //console.log(objScene3D.camera.objAutourJoueur.objEnvantJoueurFar.intZ);
}