function creerObj3DPlancherEnclos(objgl, intNoTexture) {
    const obj3DPlancherEnclos = new Object();
    obj3DPlancherEnclos.fltProfondeur = 3;
    obj3DPlancherEnclos.fltLargeur = 3;
    obj3DPlancherEnclos.fltHauteur = 0.1;
    obj3DPlancherEnclos.fltCentrePlancherEnclos = 31 / 2;
    obj3DPlancherEnclos.binVisible = true;

    obj3DPlancherEnclos.vertex = creerVertexPlancherEnclos(objgl, obj3DPlancherEnclos.fltLargeur, obj3DPlancherEnclos.fltProfondeur, obj3DPlancherEnclos.fltHauteur);
    obj3DPlancherEnclos.couleurs = creerCouleursPlancherEnclos(objgl, [0.1, 0.46, 0.99, 1]);
    obj3DPlancherEnclos.texels = creerTexelsPlancherEnclos(objgl, obj3DPlancherEnclos.fltLargeur, obj3DPlancherEnclos.fltProfondeur, intNoTexture);
    obj3DPlancherEnclos.maillage = creerMaillagePlancherEnclos(objgl);

    obj3DPlancherEnclos.transformations = creerTransformations();
    setPositionX(obj3DPlancherEnclos.fltCentrePlancherEnclos, obj3DPlancherEnclos.transformations);
    setPositionZ(obj3DPlancherEnclos.fltCentrePlancherEnclos, obj3DPlancherEnclos.transformations);
    return obj3DPlancherEnclos;
}

function changerHauteurPlancherEnclos(obj3DPlancherEnclos, fltHauteur){
    obj3DPlancherEnclos.fltHauteur = fltHauteur;
    obj3DPlancherEnclos.vertex = creerVertexPlancherEnclos(objgl, obj3DPlancherEnclos.fltLargeur, obj3DPlancherEnclos.fltProfondeur, obj3DPlancherEnclos.fltHauteur);
}

function creerVertexPlancherEnclos(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        -fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, fltProfondeur / 2
    ];

    const objPlancherEnclos = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objPlancherEnclos);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objPlancherEnclos;
}

function creerCouleursPlancherEnclos(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursPlancherEnclos = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPlancherEnclos);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursPlancherEnclos;
}

function creerTexelsPlancherEnclos(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    const tabTexels = [
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltProfondeur,
        fltLargeur, fltProfondeur
    ];

    const objTexelsPlancherEnclos = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPlancherEnclos);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsPlancherEnclos.intNoTexture = intNoTexture; 
    objTexelsPlancherEnclos.pcCouleurTexel = 0.8;

    return objTexelsPlancherEnclos;
}

function creerMaillagePlancherEnclos(objgl) {

    const tabMaillage =
        [ // Les 2 triangles du PlancherEnclos
            0, 1, 2,
            1, 2, 3,
        ];

    const objMaillagePlancherEnclos = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePlancherEnclos);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillagePlancherEnclos.intNbTriangles = 2;
    // Le nombre de droites
    objMaillagePlancherEnclos.intNbDroites = 0;

    return objMaillagePlancherEnclos;
}
