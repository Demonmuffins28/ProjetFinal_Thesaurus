

function creerObj3DMur(objgl, intNoTexture, intX, intZ, binOuvrable) {
    const obj3DMur = new Object();
    obj3DMur.fltProfondeur = 1;
    obj3DMur.fltLargeur = 1;
    obj3DMur.fltHauteur = 3;
    obj3DMur.intX = intX;
    obj3DMur.intZ = intZ;
    obj3DMur.binOuvrable = binOuvrable;

    obj3DMur.vertex = creerVertexMur(objgl, obj3DMur.fltLargeur, obj3DMur.fltProfondeur, obj3DMur.fltHauteur);
    obj3DMur.couleurs = creerCouleursMur(objgl, [1, 1, 1, 1]);
    obj3DMur.texels = creerTexelsMur(objgl, obj3DMur.fltLargeur, obj3DMur.fltProfondeur, obj3DMur.fltHauteur, intNoTexture);
    obj3DMur.maillage = null;

    obj3DMur.transformations = creerTransformations();
    setPositionX(obj3DMur.intX, obj3DMur.transformations);
    setPositionZ(obj3DMur.intZ, obj3DMur.transformations);
    return obj3DMur;
}

function creerVertexMur(objgl, fltLargeur, fltProfondeur, fltHauteur) {
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
    const tabObjMur = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjMur[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjMur[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjMur[i].typeDessin = objgl.TRIANGLE_FAN;
    }
    return tabObjMur;
}

function creerCouleursMur(objgl, tabCouleur) {
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

    const tabObjCouleursMur = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjCouleursMur[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursMur[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursMur;
}

function creerTexelsMur(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
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

    const tabObjTexelsMur = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjTexelsMur[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjTexelsMur[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        tabObjTexelsMur[i].intNoTexture = intNoTexture; tabObjTexelsMur[i].pcCouleurTexel = 1;
    }
    return tabObjTexelsMur;
}

