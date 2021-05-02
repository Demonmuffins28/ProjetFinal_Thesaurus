function creerObj3DPointeFleche(objgl, intNoTexture, intX, intZ, binVisible) {
    const obj3DPointeFleche = new Object();
    obj3DPointeFleche.fltProfondeur = 0.5;
    obj3DPointeFleche.fltLargeur = 0.2;
    obj3DPointeFleche.fltHauteur = 0.01 ;


    obj3DPointeFleche.vertex = creerFleche(objgl, obj3DPointeFleche.fltLargeur, obj3DPointeFleche.fltProfondeur, obj3DPointeFleche.fltHauteur);
    obj3DPointeFleche.couleurs = creerFleche(objgl, [1, 0, 0, 1]);
    return obj3DPointeFleche;
}

function creerVertexPointeFleche(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        0, fltHauteur, fltProfondeur,
        -fltLargeur, fltHauteur, fltProfondeur,
        fltLargeur, fltHauteur, fltProfondeur,
    ];

    const tabVertex = [
        0, fltHauteur+1, fltProfondeur,
        fltLargeur, fltHauteur, fltProfondeur,
        fltLargeur, fltHauteur, fltProfondeur,
    ];

    const objPointeFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objPointeFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objPointeFleche;
}

