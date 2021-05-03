function detectionObjetAutourJoueur() {
  let intX = getPositionCameraX(objScene3D.camera);
  let intZ = getPositionCameraZ(objScene3D.camera);

  fltX = getCibleCameraX(objScene3D.camera) - getPositionCameraX(objScene3D.camera);
  fltZ = getCibleCameraZ(objScene3D.camera) - getPositionCameraZ(objScene3D.camera);
  fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
  fltXPrime = 0.2 * Math.cos(Math.acos(fltX / fltRayon));
  fltZPrime = 0.2 * Math.sin(Math.asin(fltZ / fltRayon));
  fltXPrimeFar = 1 * Math.cos(Math.acos(fltX / fltRayon));
  fltZPrimeFar = 1 * Math.sin(Math.asin(fltZ / fltRayon));

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
      objEnAvantDroitJoueur: {
         strType: tabJeu[Math.floor(intZ+2*fltZPrime)][Math.floor(intX+2*fltXPrime)],
          intX: Math.floor(intX + 2*fltXPrime * INT_CELL_LARGEUR),
          intZ: Math.floor(intZ + 2*fltZPrime * INT_CELL_PROFONDEUR),
      }
  }        
}