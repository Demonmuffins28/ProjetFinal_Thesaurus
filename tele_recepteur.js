function creerObj3DRecepteur(objgl, intX, intZ, intNoTexture, id) {
    const obj3DRecepteur = new Object();
    obj3DRecepteur.fltProfondeur = INT_CELL_PROFONDEUR/2.5;
    obj3DRecepteur.fltLargeur = INT_CELL_LARGEUR/2.5;
    obj3DRecepteur.fltHauteur = 0.3;
    obj3DRecepteur.intX = intX + 0.5;
    obj3DRecepteur.intZ = intZ + 0.5;
    //id = Position dans tableau objScene3D
    obj3DRecepteur.id = id;
    obj3DRecepteur.binVisible = true;

    obj3DRecepteur.intNbCirconvolutions = 2;
    obj3DRecepteur.vertex = creerVertexTranspo(objgl, obj3DRecepteur.intNbCirconvolutions, obj3DRecepteur.fltHauteur, 
                    obj3DRecepteur.fltLargeur, obj3DRecepteur.fltProfondeur);
    obj3DRecepteur.tabCouleurDebut = [0.92, .73, 0.28];    
    obj3DRecepteur.tabCouleurMilieu = [0.76, 0.37, 0.2];   
    obj3DRecepteur.tabCouleurFin = [0.75, 0.22, 0.22];
    obj3DRecepteur.couleurs = creerCouleursTranspo(objgl, obj3DRecepteur.intNbCirconvolutions,obj3DRecepteur.tabCouleurDebut,
                    obj3DRecepteur.tabCouleurMilieu, obj3DRecepteur.tabCouleurFin);
    obj3DRecepteur.texels = creerTexelsTranspo(objgl, obj3DRecepteur.intNbCirconvolutions, intNoTexture);
    obj3DRecepteur.maillage = creerMaillageTranspo(objgl, obj3DRecepteur.intNbCirconvolutions);

    obj3DRecepteur.transformations = creerTransformations();
    changerPos(obj3DRecepteur.intX, obj3DRecepteur.intZ, obj3DRecepteur.transformations);
    return obj3DRecepteur;
}

function creerVertexTranspo(objgl, intNbCirconvolutions, fltHauteur, fltLargeur, fltProfondeur) {
    const fltDistRayon = 1 / (180 * intNbCirconvolutions);
 
    // Cr�er 4 vrilles imbriqu�es l'une dans l'autre 
    let tabVertex = [];
    for (let j = 0; j < 4; j++) {
        let fltRayon = 0.0;
        for (let i = j * 90; i < 360 * intNbCirconvolutions + j * 90; i+=2) {
            fltRayon += fltDistRayon;
            tabVertex = tabVertex.concat([Math.cos(i * Math.PI / 180) * fltRayon * fltLargeur,fltHauteur * fltRayon,Math.sin(i * Math.PI / 180) * fltRayon * fltProfondeur]);
        }
    }

    const objTornade = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTornade);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    
    return objTornade;
}

function creerCouleursTranspo(objgl, intNbCirconvolutions, tabCouleurDebut, tabCouleurMilieu, tabCouleurFin) {
    const intNbCoups = [Math.round(180 * intNbCirconvolutions),
                      Math.round(180 * intNbCirconvolutions)];

    const fltDistRouge = [(tabCouleurMilieu[0] - tabCouleurDebut[0]) / intNbCoups[0], 
                        (tabCouleurFin[0] - tabCouleurMilieu[0]) / intNbCoups[1]];
    const fltDistVert = [(tabCouleurMilieu[1] - tabCouleurDebut[1]) / intNbCoups[0],
                       (tabCouleurFin[1] - tabCouleurMilieu[1]) / intNbCoups[1]];
    const fltDistBleu = [(tabCouleurMilieu[2] - tabCouleurDebut[2]) / intNbCoups[0], 
                      (tabCouleurFin[2] - tabCouleurMilieu[2]) / intNbCoups[1]];

    // Cr�er des d�grad�s de couleurs de la couleur du milieu jusqu'� la couleur de la fin
    let tabCouleurs = [];
    let fltRouge = tabCouleurDebut[0];
    let fltVert = tabCouleurDebut[1];
    let fltBleu = tabCouleurDebut[2];

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < intNbCoups[j]; i++) {
            const tabCouleur = [fltRouge, fltVert, fltBleu, 1];
            tabCouleurs = tabCouleurs.concat(tabCouleur);
            fltRouge += fltDistRouge[j] * 1.2;
            fltVert += fltDistVert[j] * 1.2;
            fltBleu += fltDistBleu[j] * 1.2;
        } 
    }
    
    // Les d�grad�s de couleurs sont les m�mes pour les 4 vrilles
    tabCouleurs = tabCouleurs.concat(tabCouleurs).concat(tabCouleurs).concat(tabCouleurs);

    const objCouleursTornade = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTornade);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
 
    return objCouleursTornade;
}

function creerTexelsTranspo(objgl, intNbCirconvolutions, intNoTexture) {
    let tabTexels = [0.5,0.5]; 
    for (let i = 0; i < 4 * intNbCirconvolutions * 180; i++)
        tabTexels = tabTexels.concat([0.5 + 0.5 * Math.cos(i * Math.PI / 180), 0.5 + 0.5 * Math.sin(i * Math.PI / 180)]);

   const objTexelsTornade = objgl.createBuffer();
   objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTornade);
   objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

   objTexelsTornade.intNoTexture = intNoTexture; objTexelsTornade.pcCouleurTexel = 0;
    
   return objTexelsTornade;
}

function creerMaillageTranspo(objgl, intNbCirconvolutions) {
    let noVertex = 0;
    let tabMaillage = [];
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < intNbCirconvolutions * 180 - 1; i++)
        {     
            tabMaillage = tabMaillage.concat([noVertex, noVertex + 1]);
            noVertex++;
        }
        noVertex++;
    }

    const objMaillageTornade = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTornade);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageTornade.intNbTriangles = 0;
    // Le nombre de droites
    objMaillageTornade.intNbDroites = 4 * (intNbCirconvolutions * 180 - 1);

    return objMaillageTornade;
}