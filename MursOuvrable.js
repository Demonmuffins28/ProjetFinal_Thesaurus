function creerObj3DMurOuvrable(objgl, intNoTexture) {
    const obj3DMurOuvrable = new Object();
    obj3DMurOuvrable.fltProfondeur = 1;
    obj3DMurOuvrable.fltLargeur = 1;
    obj3DMurOuvrable.fltHauteur = 1;

    obj3DMurOuvrable.vertex = creerVertexMurOuvrable(objgl, obj3DMurOuvrable.fltLargeur, obj3DMurOuvrable.fltProfondeur, obj3DMurOuvrable.fltHauteur);
    obj3DMurOuvrable.couleurs = creerCouleursMurOuvrable(objgl, [1, 1, 1, 1]);
    obj3DMurOuvrable.texels = creerTexelsMurOuvrable(objgl, obj3DMurOuvrable.fltLargeur, obj3DMurOuvrable.fltProfondeur, intNoTexture);
    obj3DMurOuvrable.maillage = creerMaillageMurOuvrable(objgl);

    obj3DMurOuvrable.transformations = creerTransformations();
    setPositionX(0.5, obj3DMurOuvrable.transformations);
    setPositionZ(0.5, obj3DMurOuvrable.transformations);
    return obj3DMurOuvrable;
}

function creerVertexMurOuvrable(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        -fltLargeur / 2, 0.0, -fltProfondeur / 2,
        fltLargeur / 2, 0.0, -fltProfondeur / 2,
        -fltLargeur / 2, 0.0, fltProfondeur / 2,
        fltLargeur / 2, 0.0, fltProfondeur / 2,

        -fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, fltProfondeur / 2
    ];

    const objMurOuvrable = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMurOuvrable);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMurOuvrable;
}

function creerCouleursMurOuvrable(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 8; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursMurOuvrable = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMurOuvrable);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMurOuvrable;
}

function creerTexelsMurOuvrable(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    const tabTexels = [
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltProfondeur,
        fltLargeur, fltProfondeur,

        0.0, 0.0,
        2, 0.0,
        0.0, fltProfondeur,
        2, fltProfondeur,
    ];

    const objTexelsMurOuvrable = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurOuvrable);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurOuvrable.intNoTexture = intNoTexture; objTexelsMurOuvrable.pcCouleurTexel = 1.0;

    return objTexelsMurOuvrable;
}

function creerMaillageMurOuvrable(objgl) {

    const tabMaillage =
        [ // Les 2 triangles du MurOuvrable
            4, 5, 6,
            5, 6, 7,

            7, 5, 3,
            5, 3, 1,

            6, 4, 2,
            4, 2, 0
        ];

    const objMaillageMurOuvrable = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMurOuvrable);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMurOuvrable.intNbTriangles = 6;
    // Le nombre de droites
    objMaillageMurOuvrable.intNbDroites = 0;

    return objMaillageMurOuvrable;
}
