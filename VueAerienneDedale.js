function cameraVueAerienne(event){
    if (event.keyCode == 33 && !binVueAerienne){
        binVueAerienne = true;
        objCopieCameraVueJoueur = objScene3D.camera;
        camera = creerCamera();
        setPositionsCameraXYZ([31/2, 40, 31/2], camera);
        setCiblesCameraXYZ([31/2, 0, 31/2 + 0.0001], camera);
        setOrientationsXYZ([0, 1, 0], camera);
        objScene3D.camera = camera;
        objScene3D.tabObjets3D[1].binVisible = false;
    }
    else if (event.keyCode == 34 && binVueAerienne){
        binVueAerienne = false;
        objScene3D.tabObjets3D[1].binVisible = true;
        objScene3D.camera = objCopieCameraVueJoueur;
    }
}  
