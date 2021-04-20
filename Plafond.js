function creerObj3DPlafond(objgl, intNoTexture, binVisible) {
    const obj3DPlafond = new Object();
    obj3DPlafond.fltProfondeur = 31;
    obj3DPlafond.fltLargeur = 31;
    obj3DPlafond.fltHauteur = 2;
    obj3DPlafond.fltCentrePlafond = 31 / 2;
    obj3DPlafond.binVisible = binVisible;

    obj3DPlafond.vertex = creerVertexPlafond(objgl, obj3DPlafond.fltLargeur, obj3DPlafond.fltProfondeur, obj3DPlafond.fltHauteur);
    obj3DPlafond.couleurs = creerCouleursPlafond(objgl, [1, 1, 1, 1]);
    obj3DPlafond.texels = creerTexelsPlafond(objgl, obj3DPlafond.fltLargeur, obj3DPlafond.fltProfondeur, intNoTexture);
    obj3DPlafond.maillage = creerMaillagePlafond(objgl);

    obj3DPlafond.transformations = creerTransformations();
    setPositionX(obj3DPlafond.fltCentrePlafond, obj3DPlafond.transformations);
    setPositionZ(obj3DPlafond.fltCentrePlafond, obj3DPlafond.transformations);
    return obj3DPlafond;
}

function creerVertexPlafond(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        -fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, fltProfondeur / 2
    ];

    const objPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objPlafond;
}

function creerCouleursPlafond(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursPlafond;
}

function creerTexelsPlafond(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    const tabTexels = [
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltProfondeur,
        fltLargeur, fltProfondeur
    ];

    const objTexelsPlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsPlafond);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsPlafond.intNoTexture = intNoTexture; objTexelsPlafond.pcCouleurTexel = 1.0;

    return objTexelsPlafond;
}

function creerMaillagePlafond(objgl) {

    const tabMaillage =
        [ // Les 2 triangles du Plafond
            0, 1, 2,
            1, 2, 3,
        ];

    const objMaillagePlafond = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillagePlafond);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillagePlafond.intNbTriangles = 2;
    // Le nombre de droites
    objMaillagePlafond.intNbDroites = 0;

    return objMaillagePlafond;
}
