function creerFleche3D(objgl, intNoTexture ,intX, intZ) {
    const obj3DFleche = new Object();
    obj3DFleche.fltProfondeur = 0.5;
    obj3DFleche.fltLargeur = 0.2;
    obj3DFleche.fltHauteur = 0.2;
    obj3DFleche.intX = intX;
    obj3DFleche.intZ = intZ;
    obj3DFleche.binOuvrable = true;

    obj3DFleche.vertex = creerVertexPyramide(objgl, obj3DFleche.fltLargeur, obj3DFleche.fltProfondeur, obj3DFleche.fltHauteur);
    obj3DFleche.couleurs = creerCouleursPyramide(objgl, [1, 1, 1, 1]);
    obj3DFleche.texels = creerTexelsPyramide(objgl, intNoTexture);;
    obj3DFleche.maillage = null;

    obj3DFleche.transformations = creerTransformations();
    changerPos(obj3DFleche.intX, obj3DFleche.intZ, obj3DFleche.transformations);
    setPositionY(1, obj3DFleche.transformations);
    return obj3DFleche;
}

function creerVertexPyramide(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = new Array();

     // Face avant pleine
     tabVertex[0] = [
        0, 0, 0, // Centre du plan 
        fltLargeur, 0, 0,
        0, fltHauteur, 0,
        0, fltHauteur, 0,
        fltLargeur, 0, 0,
        fltLargeur, fltHauteur, 0,
        0, fltHauteur, 0
    ];

    // face droite
    tabVertex[1] = [
        fltLargeur, fltHauteur, 0,
        fltLargeur/2, fltHauteur/2, fltProfondeur,
        fltLargeur, 0, 0,
    ];

    // face gauche
    tabVertex[2] = [
        0, fltHauteur, 0,
        fltLargeur/2, fltHauteur/2, fltProfondeur,
        0, 0, 0,
    ];

    // face dessus
    tabVertex[3] = [
        0, fltHauteur, 0,
        fltLargeur/2, fltHauteur/2, fltProfondeur,
        fltLargeur, fltHauteur, 0,
    ];

    // face dessous
    tabVertex[4] = [
        0, 0, 0,
        fltLargeur/2, fltHauteur/2, fltProfondeur,
        fltLargeur, 0, 0,
    ];    

    // Création des tampons
    const tabObjPyramide = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjPyramide[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjPyramide[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjPyramide[i].typeDessin = objgl.TRIANGLE_FAN;
    }

    return tabObjPyramide;
}

function creerCouleursPyramide(objgl, tabCouleur) {
    const tabCouleurs = new Array();

    tabCouleurs[0] = [];
    tabCouleurs[1] = [];
    tabCouleurs[2] = [];
    tabCouleurs[3] = [];
    tabCouleurs[4] = [];
    
    for (let i = 0; i < 7; i++){
        tabCouleurs[0] = tabCouleurs[0].concat(tabCouleur);       
    }
    for (let i = 0; i < 3; i++) {
        tabCouleurs[1] = tabCouleurs[1].concat([1,1,0,0.5]);
        tabCouleurs[2] = tabCouleurs[2].concat([1,1,0,0.5]);
        tabCouleurs[3] = tabCouleurs[3].concat([1,1,0,0.3]);;
        tabCouleurs[4] = tabCouleurs[4].concat([1,1,0,0.8]);;
    }

    // Couleurs face avant pleine
    // tabCouleurs[0] = tabCouleur; // Blanc 
    // for (let i = 1; i < 6; i++)
    //     tabCouleurs[0] = tabCouleurs[0].concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Couleurs face arrière pleine
    // tabCouleurs[1] = [1.0, 1.0, 1.0, 1.0]; // Blanc
    // for (let i = 1; i < 6; i++)
    //     tabCouleurs[1] = tabCouleurs[1].concat([0.0, 1.0, 0.0, 1.0]); // Vert

    // Couleurs contour avant
    // tabCouleurs[1] = [];
    // for (let i = 0; i < 4; i++)
    //     tabCouleurs[1] = tabCouleurs[1].concat([1.0, 1.0, 1.0, 1.0]); // Blanc

    // // Couleurs contour arrière
    // tabCouleurs[2] = tabCouleurs[1];

    // // Couleurs droites reliées aux 2 faces
    // tabCouleurs[3] = tabCouleurs[1].concat(tabCouleur);

    // Création des tampons
    const tabObjCouleursPyramide = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjCouleursPyramide[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursPyramide[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursPyramide;
}

function creerTexelsPyramide(objgl, intNoTexture) {
    const tabTexels = new Array();

    tabTexels[0] = [
        0,1.0,
        0,1.0,
        0,1.0,
        0,1.0,
        0,1.0,
        0,1.0,
        0,1.0
    ]

    for (let i = 1; i < 5; i++){
        tabTexels[i] = [
            0,1.0,
            0,1.0,
            0,1.0,
        ];
    }

    const tabObjTexelsFleche = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjTexelsFleche[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjTexelsFleche[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        tabObjTexelsFleche[i].intNoTexture = intNoTexture; tabObjTexelsFleche[i].pcCouleurTexel = 0;
    }
    return tabObjTexelsFleche;
}