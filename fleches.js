function creerPyramide(objgl) {
    const tabVertex = new Array();

    // Face avant pleine
    tabVertex[0] = [
          0.5, 0.5, 1.0, // Centre du plan 
           0.5, 0.5, 1.0,
           -0.5, 0.5, 1.0,
           -0.0, -0.0, 0.0,
           0.0, -0.0, 0.0
    ];

     // Face avant pleine
     tabVertex[1] = [
          -0.5, -0.5,1.0, // Centre du plan 
           -0.5, 0.5, 1.0,
           -0.5, 0.5, 1.0,
           0.0, -0.0, 0.0,
           0.0, -0.0, 0.0
    ];
/*
    // Face arrère pleine
    tabVertex[1] = [
           0.0, 0.0, -1.0, // Centre du plan
           0.01, 1.0, -1.0,
          -1.0, 1.0, -1.0,
          -1.0, -1.0, -1.0,
           1.0, -1.0, -1.0,
           1.0, 1.0, -1.0
    ];*/

    // Contour avant
    tabVertex[2] = [
            0.5, 0.5, 1.0,
           -0.5, 0.5, 1.0,
           -0.5, -0.5, 1.0,
           0.5, -0.5, 1.0
    ];

    // Contour arrière
    tabVertex[3] = [
            1.0, 1.0, -1.0,
           -1.0, 1.0, -1.0,
           -1.0, -1.0, -1.0,
           1.0, -1.0, -1.0
    ];

    // pointe
    tabVertex[4] = [
          0.01,0.01, 0.01, 0.5, 0.5, 1.0,
          -0.01, 0.01, 0.01, -0.5, 0.5, 1.0,
          0.01, 0.01, 0.01, 0.5, -0.5, 1.0,
          -0.01, 0.01, 0.01, -0.5, -0.5, 1.0
    ];

    // Création des tampons
    const tabObjPyramide = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjPyramide[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjPyramide[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjPyramide[i].typeDessin = (i < 2) ? objgl.TRIANGLE_FAN : ((i < 4) ? objgl.LINE_LOOP : objgl.LINES);
    }

    return tabObjPyramide;
}

function creerCouleursPyramide(objgl) {
    const tabCouleurs = new Array();

    // Couleurs face avant pleine
    tabCouleurs[0] = [1.0, 1.0, 1.0, 1.0]; // Blanc 
    for (let i = 1; i < 6; i++)
        tabCouleurs[0] = tabCouleurs[0].concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Couleurs face arrière pleine
    tabCouleurs[1] = [1.0, 1.0, 1.0, 1.0]; // Blanc
    for (let i = 1; i < 6; i++)
        tabCouleurs[1] = tabCouleurs[1].concat([0.0, 1.0, 0.0, 1.0]); // Vert

    // Couleurs contour avant
    tabCouleurs[2] = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs[2] = tabCouleurs[2].concat([1.0, 1.0, 1.0, 1.0]); // Blanc

    // Couleurs contour arrière
    tabCouleurs[3] = tabCouleurs[2];

    // Couleurs droites reliées aux 2 faces
    tabCouleurs[4] = tabCouleurs[2].concat(tabCouleurs[2]);

    // Création des tampons
    const tabObjCouleursPyramide = new Array();
    for (let i = 0; i < 5; i++) {
        tabObjCouleursPyramide[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursPyramide[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursPyramide;
}