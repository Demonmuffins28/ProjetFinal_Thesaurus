function cameraVueAerienne(event){
    if (!binTricher && binVueAerienne && event.ctrlKey && event.shiftKey && event.keyCode == 32){
        tricherie();
    }
    else if (binTricher && binVueAerienne && event.ctrlKey && event.shiftKey && event.keyCode == 32){
        retirerTricherie();
    }

    if (event.keyCode == 33 && !binVueAerienne){
        binTournerCamera = false;
        binMovAvant = false;
        binMovArriere = false;
        binMovDroit = false;
        binMovGauche = false;
        binEnMouvement = false;

        intSecondeVueAerienne = intSeconde;
        intScoreDebutVueAerienne = intScoreNiveau;

        binVueAerienne = true;
        objCopieCameraVueJoueur = objScene3D.camera;

        let camera = creerCamera();
        setPositionsCameraXYZ([31/2, 40, 31/2], camera);
        setCiblesCameraXYZ([31/2, 0, 31/2 + 0.0001], camera);
        setOrientationsXYZ([0, -1, 0], camera);
        objScene3D.camera = camera;
 
        let fltX = getCibleCameraX(objCopieCameraVueJoueur) - getPositionCameraX(objCopieCameraVueJoueur);
        let fltZ = getCibleCameraZ(objCopieCameraVueJoueur) - getPositionCameraZ(objCopieCameraVueJoueur);
        let fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
        let fltXPrime = 1 * Math.cos(Math.acos(fltX / fltRayon));
        let fltZPrime = 1 * Math.sin(Math.asin(fltZ / fltRayon));

        let angle = (Math.atan(fltXPrime/fltZPrime) * 180) / Math.PI;
        if (fltZPrime > 0) angle = 180 + angle;

        objScene3D.tabObjets3D[2].binVisible = true;
        objScene3D.tabObjets3D[2].intX = getPositionCameraX(objCopieCameraVueJoueur);
        objScene3D.tabObjets3D[2].intZ = getPositionCameraZ(objCopieCameraVueJoueur);
        changerPos(objScene3D.tabObjets3D[2].intX, objScene3D.tabObjets3D[2].intZ, objScene3D.tabObjets3D[2].transformations);
        setAngleY(angle, objScene3D.tabObjets3D[2].transformations)

        changerHauteurPlancherEnclos(objScene3D.tabObjets3D[4], 2.1);
    }
    else if (event.keyCode == 34 && binVueAerienne){
        retourVueJoueur();
    }
}  

function tricherie(){
    binTricher = true;
    objScene3D.tabObjets3D[1].binVisible = false;
    for (let i=0; i<tabIndexMur.length; i++){
        changerHauteurMur(objScene3D.tabObjets3D[tabIndexMur[i]], 0.1)
    }
    changerHauteurObjFlechePosJoueur(objScene3D.tabObjets3D[2], 0.6);
    setPositionsCameraXYZ([31/2, 38, 31/2], objScene3D.camera);
    changerHauteurPlancherEnclos(objScene3D.tabObjets3D[4], 0.1);
    for (let i=0; i<tabIndexFleches.length; i++) {
        setPositionY(0.1, objScene3D.tabObjets3D[tabIndexFleches[i]].transformations);
    }
}

function retirerTricherie(){
    binTricher = false;
    objScene3D.tabObjets3D[1].binVisible = true;
    for (let i=0; i<tabIndexMur.length; i++){
        changerHauteurMur(objScene3D.tabObjets3D[tabIndexMur[i]], 2.1)
    }
    changerHauteurObjFlechePosJoueur(objScene3D.tabObjets3D[2], 2.2);
    setPositionsCameraXYZ([31/2, 40, 31/2], objScene3D.camera);
    changerHauteurPlancherEnclos(objScene3D.tabObjets3D[4], 2.1);
    for (let i=0; i<tabIndexFleches.length; i++) {
        setPositionY(1.3, objScene3D.tabObjets3D[tabIndexFleches[i]].transformations);
    }
}

function retourVueJoueur(){
    binVueAerienne = false;
    if (binTricher) retirerTricherie();
    objScene3D.tabObjets3D[2].binVisible = false;
    objScene3D.camera = objCopieCameraVueJoueur;
    changerHauteurPlancherEnclos(objScene3D.tabObjets3D[4], 0.1);
}