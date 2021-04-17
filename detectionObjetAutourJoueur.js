function detectionObjetAutourJoueur() {
    let intX = Math.floor(getPositionCameraX(objScene3D.camera));
    let intZ = Math.floor(getPositionCameraZ(objScene3D.camera));

    fltX = getCibleCameraX(objScene3D.camera) - getPositionCameraX(objScene3D.camera);
    fltZ = getCibleCameraZ(objScene3D.camera) - getPositionCameraZ(objScene3D.camera);
    fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);

    fltXPrime = Math.floor(Math.cos(Math.acos(fltX / fltRayon)));
    fltZPrime = Math.floor(Math.sin(Math.asin(fltZ / fltRayon)));

    objScene3D.camera.objAutourJoueur = {
        objAPosJoueur: {
            strType: tabJeu[intZ][intX],
            intX: intX * objScene3D.tabObjets3D[1].fltLargeur,
            intZ: intZ * objScene3D.tabObjets3D[1].fltProfondeur,
        },
        objEnAvantJoueur: {
            strType: tabJeu[intZ+fltZPrime][intX+fltXPrime],
            intX: intX + fltXPrime * objScene3D.tabObjets3D[1].fltLargeur,
            intZ: intZ + fltZPrime * objScene3D.tabObjets3D[1].fltProfondeur,
        },
        objEnArriereJoueur: {
            strType: tabJeu[intZ-fltZPrime][intX-fltXPrime],
            intX: intX - fltXPrime * objScene3D.tabObjets3D[1].fltLargeur,
            intZ: intZ - fltZPrime * objScene3D.tabObjets3D[1].fltProfondeur,
        },
    }
}