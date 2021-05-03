

function creerObj3DCoffre(objgl, intNoTexture, intX, intZ) {
    const obj3DCoffre = new Object();
    obj3DCoffre.fltProfondeur = 0.5;
    obj3DCoffre.fltLargeur = 0.5;
    obj3DCoffre.fltHauteur = 0.4;
    obj3DCoffre.intX = intX;
    obj3DCoffre.intZ = intZ;
    obj3DCoffre.binVisible = true;

    obj3DCoffre.vertex = creerVertexCoffre(objgl, obj3DCoffre.fltLargeur, obj3DCoffre.fltProfondeur, obj3DCoffre.fltHauteur);
    obj3DCoffre.couleurs = creerCouleursCoffre(objgl, [1, 1, 1, 1]);
    obj3DCoffre.texels = creerTexelsCoffre(objgl, obj3DCoffre.fltLargeur, obj3DCoffre.fltProfondeur, obj3DCoffre.fltHauteur, intNoTexture);
    obj3DCoffre.maillage = null;

    obj3DCoffre.transformations = creerTransformations();
    setPositionX(obj3DCoffre.intX + 0.25, obj3DCoffre.transformations);
    setPositionZ(obj3DCoffre.intZ + 0.25, obj3DCoffre.transformations);
    return obj3DCoffre;
}

function creerVertexCoffre(objgl, fltLargeur, fltProfondeur, fltHauteur) {
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
    const tabObjCoffre = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjCoffre[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCoffre[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjCoffre[i].typeDessin = objgl.TRIANGLE_FAN;
    }
    return tabObjCoffre;
}

function creerCouleursCoffre(objgl, tabCouleur) {
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

    const tabObjCouleursCoffre = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjCouleursCoffre[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursCoffre[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursCoffre;
}

function creerTexelsCoffre(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    const tabTexels = new Array();

    for (let i = 0; i < 4; i++){
        tabTexels[i] = [
            9/1024, 204/1024,
            392/1024, 8/1024,
            9/1024, 8/1024,
            9/1024, 204/1024,
            392/1024, 204/1024,
            392/1024, 8/1024
        ];
    }
    tabTexels[4] = [
        6/1024, 399/1024,
        389/1024, 216/1024,
        6/1024, 216/1024,
        6/1024, 399/1024,
        389/1024, 399/1024,
        389/1024, 216/1024
    ];
    

    const tabObjTexelsCoffre = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjTexelsCoffre[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjTexelsCoffre[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        tabObjTexelsCoffre[i].intNoTexture = intNoTexture; tabObjTexelsCoffre[i].pcCouleurTexel = 1;
    }
    return tabObjTexelsCoffre;
}
