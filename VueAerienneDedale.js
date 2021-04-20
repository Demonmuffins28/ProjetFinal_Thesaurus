function cameraVueAerienne(event){
    if (event.keyCode == 33 && !binVueAerienne){
        binTournerCamera = false;
        binMovAvant = false;
        binMovArriere = false;
        binMovDroit = false;
        binMovGauche = false;
        binEnMouvement = false;

        binVueAerienne = true;
        objCopieCameraVueJoueur = objScene3D.camera;

        let camera = creerCamera();
        setPositionsCameraXYZ([31/2, 40, 31/2], camera);
        setCiblesCameraXYZ([31/2, 0, 31/2 + 0.0001], camera);
        setOrientationsXYZ([0, -1, 0], camera);
        objScene3D.camera = camera;
        objScene3D.tabObjets3D[1].binVisible = false;
 
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

    }
    else if (event.keyCode == 34 && binVueAerienne){
        binVueAerienne = false;
        objScene3D.tabObjets3D[1].binVisible = true;
        objScene3D.tabObjets3D[2].binVisible = false;
        objScene3D.camera = objCopieCameraVueJoueur;
    }
}  
