function creerObj3DMurOuvrable(objgl, intNoTexture, intX, intZ) {
    const obj3DMurOuvrable = new Object();
    obj3DMurOuvrable.fltProfondeur = 1;
    obj3DMurOuvrable.fltLargeur = 1;
    obj3DMurOuvrable.fltHauteur = 3;
    obj3DMurOuvrable.intX = intX;
    obj3DMurOuvrable.intz = intZ;

    obj3DMurOuvrable.vertex = creerVertexMurOuvrable(objgl, obj3DMurOuvrable.fltLargeur, obj3DMurOuvrable.fltProfondeur, obj3DMurOuvrable.fltHauteur);
    obj3DMurOuvrable.couleurs = creerCouleursMurOuvrable(objgl, [1, 1, 1, 1]);
    obj3DMurOuvrable.texels = creerTexelsMurOuvrable(objgl, obj3DMurOuvrable.fltLargeur, obj3DMurOuvrable.fltProfondeur, obj3DMurOuvrable.fltHauteur, intNoTexture);
    obj3DMurOuvrable.maillage = null;

    obj3DMurOuvrable.transformations = creerTransformations();
    setPositionX(obj3DMurOuvrable.intX, obj3DMurOuvrable.transformations);
    setPositionZ(obj3DMurOuvrable.intz, obj3DMurOuvrable.transformations);
    return obj3DMurOuvrable;
}

function creerVertexMurOuvrable(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = new Array();

    // Face avant pleine
    tabVertex[0] = [
        0.0, 0.0, fltProfondeur, // Centre du plan 
        fltLargeur, fltHauteur, fltProfondeur,
        0, fltHauteur, fltProfondeur,
        0, 0, fltProfondeur,
        fltLargeur, 0, fltProfondeur,
        fltLargeur, fltHauteur, fltProfondeur
    ];

    // Face arrère pleine
    tabVertex[1] = [
        0.0, 0.0, 0, // Centre du plan
        fltLargeur, fltHauteur, 0,
        0, fltHauteur, 0,
        0, 0, 0,
        fltLargeur, 0, 0,
        fltLargeur, fltHauteur, 0
    ];
    // Face gauche pleine
    tabVertex[2] = [
        0, 0.0, 0.0, // Centre du plan
        0, fltHauteur, fltProfondeur,
        0, fltHauteur, 0,
        0, 0, 0,
        0, 0, fltProfondeur,
        0, fltHauteur, fltProfondeur
    ];

    // Face droite pleine
    tabVertex[3] = [
        fltLargeur, 0.0, 0.0, // Centre du plan
        fltLargeur, fltHauteur, fltProfondeur,
        fltLargeur, fltHauteur, 0,
        fltLargeur, 0, 0,
        fltLargeur, 0, fltProfondeur,
        fltLargeur, fltHauteur, fltProfondeur
    ];

    // Face haut pleine
    tabVertex[4] = [
        0.0, fltHauteur, 0.0, // Centre du plan 
        fltLargeur, fltHauteur, fltProfondeur,
        0, fltHauteur, fltProfondeur,
        0, fltHauteur, 0,
        fltLargeur, fltHauteur, 0,
        fltLargeur, fltHauteur, fltProfondeur
    ];

    // Création des tampons
    const tabObjMurOuvrable = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjMurOuvrable[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjMurOuvrable[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjMurOuvrable[i].typeDessin = objgl.TRIANGLE_FAN;
    }
    return tabObjMurOuvrable;
}

function creerCouleursMurOuvrable(objgl, tabCouleur) {
    const tabCouleurs = new Array();
    tabCouleurs[0] = [];
    tabCouleurs[1] = [];
    tabCouleurs[2] = [];
    tabCouleurs[3] = [];
    tabCouleurs[4] = [];
    for (let i = 0; i < 6; i++){
        tabCouleurs[0] = tabCouleurs[0].concat(tabCouleur);
        tabCouleurs[1] = tabCouleurs[1].concat(tabCouleur);
        tabCouleurs[2] = tabCouleurs[2].concat(tabCouleur);
        tabCouleurs[3] = tabCouleurs[3].concat(tabCouleur);
        tabCouleurs[4] = tabCouleurs[4].concat(tabCouleur);
    }

    const tabObjCouleursMurOuvrable = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjCouleursMurOuvrable[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursMurOuvrable[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursMurOuvrable;
}

function creerTexelsMurOuvrable(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    const tabTexels = new Array();

    for (let i = 0; i < 4; i++){
        tabTexels[i] = [
            0, fltHauteur,
            fltLargeur, 0.0,
            0.0, 0.0,
            0.0, fltHauteur,
            fltLargeur, fltHauteur,
            fltLargeur, 0.0
        ];
    }
    tabTexels[4] = [
        0, fltProfondeur,
        fltLargeur, 0.0,
        0.0, 0.0,
        0.0, fltProfondeur,
        fltLargeur, fltProfondeur,
        fltLargeur, 0.0
    ]

    const tabObjTexelsMurOuvrable = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjTexelsMurOuvrable[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjTexelsMurOuvrable[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        tabObjTexelsMurOuvrable[i].intNoTexture = intNoTexture; tabObjTexelsMurOuvrable[i].pcCouleurTexel = 1;
    }
    return tabObjTexelsMurOuvrable;
}

