function creerObj3DPointeFlechePosJoueur(objgl, intNoTexture, intX, intZ, binVisible) {
    const obj3DPointeFlechePosJoueur = new Object();
    obj3DPointeFlechePosJoueur.fltProfondeur = 0.7;
    obj3DPointeFlechePosJoueur.fltLargeur = 0.5;
    obj3DPointeFlechePosJoueur.fltHauteur = 2.2;
    obj3DPointeFlechePosJoueur.binVisible = binVisible;
    obj3DPointeFlechePosJoueur.intX = intX;
    obj3DPointeFlechePosJoueur.intZ = intZ;

    obj3DPointeFlechePosJoueur.vertex = creerVertexPointeFlechePosJoueur(objgl, obj3DPointeFlechePosJoueur.fltLargeur, obj3DPointeFlechePosJoueur.fltProfondeur, obj3DPointeFlechePosJoueur.fltHauteur);
    obj3DPointeFlechePosJoueur.couleurs = creerCouleursPointeFlechePosJoueur(objgl, [1, 0, 0, 1]);
    obj3DPointeFlechePosJoueur.texels = creerTexelsPointeFlechePosJoueur(objgl, obj3DPointeFlechePosJoueur.fltLargeur, obj3DPointeFlechePosJoueur.fltProfondeur, intNoTexture);
    obj3DPointeFlechePosJoueur.maillage = creerMaillagePointeFlechePosJoueur(objgl);

    obj3DPointeFlechePosJoueur.transformations = creerTransformations();
    changerPos(obj3DPointeFlechePosJoueur.intX, obj3DPointeFlechePosJoueur.intZ, obj3DPointeFlechePosJoueur.transformations);
    return obj3DPointeFlechePosJoueur;
}


function changerHauteurObjFlechePosJoueur(obj3D, fltHauteur){
    obj3D.fltHauteur = fltHauteur;
    obj3D.vertex = creerVertexPointeFlechePosJoueur(objgl, obj3D.fltLargeur, obj3D.fltProfondeur, obj3D.fltHauteur);
}

function creerVertexPointeFlechePosJoueur(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        0, fltHauteur, -fltProfondeur / 2,
        -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, fltProfondeur / 2,
    ];

    const objPointeFlechePosJoueur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objPointeFlechePosJoueur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objPointeFlechePosJoueur;
}

function creerCouleursPointeFlechePosJoueur(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursPointeFlechePosJoueur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPointeFlechePosJoueur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursPointeFlechePosJoueur;
}

function creerTexelsPointeFlechePosJoueur(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    const tabTexels = [
        fltLargeur/2, 0.0,
        0.0, fltProfondeur,
        fltLargeur, fltProfondeur
    ];

    const objTexelsPointeFlechePosJoueur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPointeFlechePosJoueur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsPointeFlechePosJoueur.intNoTexture = intNoTexture; objTexelsPointeFlechePosJoueur.pcCouleurTexel = 0.0;

    return objTexelsPointeFlechePosJoueur;
}

function creerMaillagePointeFlechePosJoueur(objgl) {

    const tabMaillage =
        [ // Les 2 triangles du PointeFlechePosJoueur
            0, 1, 2
        ];

    const objMaillagePointeFlechePosJoueur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePointeFlechePosJoueur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillagePointeFlechePosJoueur.intNbTriangles = 1;
    // Le nombre de droites
    objMaillagePointeFlechePosJoueur.intNbDroites = 0;

    return objMaillagePointeFlechePosJoueur;
}
