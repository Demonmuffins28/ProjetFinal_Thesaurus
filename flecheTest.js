function creerObj3DPointeFleche(objgl, intNoTexture, intX, intZ, binVisible) {
    const obj3DPointeFleche = new Object();
    obj3DPointeFleche.fltProfondeur = 0.5;
    obj3DPointeFleche.fltLargeur = 0.2;
    obj3DPointeFleche.fltHauteur = 0.01 ;
    obj3DPointeFleche.binVisible = binVisible;
    obj3DPointeFleche.intX = intX;
    obj3DPointeFleche.intZ = intZ;

    obj3DPointeFleche.vertex = creerVertexPointeFleche(objgl, obj3DPointeFleche.fltLargeur, obj3DPointeFleche.fltProfondeur, obj3DPointeFleche.fltHauteur);
    obj3DPointeFleche.couleurs = creerCouleursPointeFleche(objgl, [1, 0, 0, 1]);
    obj3DPointeFleche.texels = creerTexelsPointeFlechePosJoueur(objgl, obj3DPointeFleche.fltLargeur, obj3DPointeFleche.fltProfondeur, intNoTexture);
    obj3DPointeFleche.maillage = creerMaillagePointeFleche(objgl);

    obj3DPointeFleche.transformations = creerTransformations();
    changerPos(obj3DPointeFleche.intX, obj3DPointeFleche.intZ, obj3DPointeFleche.transformations);
    let posZcoffre = (intX - tabPosCoffre[intNiveau-1].intZ);
    let posXcoffre = (intZ - tabPosCoffre[intNiveau-1].intX);
    let angleRotationFleche = Math.atan(posZcoffre/posXcoffre) / (Math.PI / 180);    
    if (angleRotationFleche < 0) angleRotationFleche = 180 + angleRotationFleche;
    
    setAngleY(angleRotationFleche, obj3DPointeFleche.transformations);
    return obj3DPointeFleche;
}

function creerVertexPointeFleche(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        0, fltHauteur, -fltProfondeur / 2,
        -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, fltProfondeur / 2,
    ];

    const objPointeFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objPointeFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objPointeFleche;
}

function creerCouleursPointeFleche(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursPointeFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPointeFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursPointeFleche;
}

function creerTexelsPointeFlechePosJoueur(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    const tabTexels = [
        fltLargeur/2, 0.0,
        0.0, fltProfondeur,
        fltLargeur, fltProfondeur
    ];

    const objTexelsPointeFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPointeFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsPointeFleche.intNoTexture = intNoTexture; objTexelsPointeFleche.pcCouleurTexel = 0.0;

    return objTexelsPointeFleche;
}

function creerMaillagePointeFleche(objgl) {

    const tabMaillage =
        [ // Les 2 triangles du PointeFlechePosJoueur
            0, 1, 2
        ];

    const objMaillagePointeFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePointeFleche);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillagePointeFleche.intNbTriangles = 1;
    // Le nombre de droites
    objMaillagePointeFleche.intNbDroites = 0;

    return objMaillagePointeFleche;
}
