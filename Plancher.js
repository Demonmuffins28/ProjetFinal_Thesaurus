function creerObj3DPlancher(objgl, intNoTexture) {
    const obj3DPlancher = new Object();
    obj3DPlancher.fltProfondeur = 31;
    obj3DPlancher.fltLargeur = 31;
    obj3DPlancher.fltHauteur = 0;
    obj3DPlancher.fltCentrePlancher = 31 / 2;

    obj3DPlancher.vertex = creerVertexPlancher(objgl, obj3DPlancher.fltLargeur, obj3DPlancher.fltProfondeur, obj3DPlancher.fltHauteur);
    obj3DPlancher.couleurs = creerCouleursPlancher(objgl, [1, 1, 1, 1]);
    obj3DPlancher.texels = creerTexelsPlancher(objgl, obj3DPlancher.fltLargeur, obj3DPlancher.fltProfondeur, intNoTexture);
    obj3DPlancher.maillage = creerMaillagePlancher(objgl);

    obj3DPlancher.transformations = creerTransformations();
    setPositionX(obj3DPlancher.fltCentrePlancher, obj3DPlancher.transformations);
    setPositionZ(obj3DPlancher.fltCentrePlancher, obj3DPlancher.transformations);
    return obj3DPlancher;
}

function creerVertexPlancher(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        -fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, fltProfondeur / 2
    ];

    const objPlancher = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objPlancher);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objPlancher;
}

function creerCouleursPlancher(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursPlancher = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPlancher);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursPlancher;
}

function creerTexelsPlancher(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    const tabTexels = [
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltProfondeur,
        fltLargeur, fltProfondeur
    ];

    const objTexelsPlancher = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPlancher);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsPlancher.intNoTexture = intNoTexture; 
    objTexelsPlancher.pcCouleurTexel = 1.0;

    return objTexelsPlancher;
}

function creerMaillagePlancher(objgl) {

    const tabMaillage =
        [ // Les 2 triangles du Plancher
            0, 1, 2,
            1, 2, 3,
        ];

    const objMaillagePlancher = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePlancher);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillagePlancher.intNbTriangles = 2;
    // Le nombre de droites
    objMaillagePlancher.intNbDroites = 0;

    return objMaillagePlancher;
}
