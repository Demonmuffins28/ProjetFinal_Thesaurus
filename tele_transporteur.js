function creerObj3DTransporteur(objgl, intX, intZ, intNoTexture, id) {
    const obj3DTranspo = new Object();
    obj3DTranspo.fltProfondeur = INT_CELL_PROFONDEUR/2;
    obj3DTranspo.fltLargeur = INT_CELL_LARGEUR/2;
    obj3DTranspo.fltHauteur = 0.5;
    obj3DTranspo.intX = intX + 0.5;
    obj3DTranspo.intZ = intZ + 0.5;
    //id = Position dans tableau objScene3D
    obj3DTranspo.id = id;
    obj3DTranspo.binVisible = true;

    obj3DTranspo.intNbCirconvolutions = 2;
    obj3DTranspo.vertex = creerVertexTranspo(objgl, obj3DTranspo.intNbCirconvolutions, obj3DTranspo.fltHauteur, 
                    obj3DTranspo.fltLargeur, obj3DTranspo.fltProfondeur);
    obj3DTranspo.tabCouleurDebut = [0.0, 1.0, 0.0];    
    obj3DTranspo.tabCouleurMilieu = [0.0, 0.0, 1.0];   
    obj3DTranspo.tabCouleurFin = [1.0, 0.8, 0.85];
    obj3DTranspo.couleurs = creerCouleursTranspo(objgl, obj3DTranspo.intNbCirconvolutions,obj3DTranspo.tabCouleurDebut,
                    obj3DTranspo.tabCouleurMilieu, obj3DTranspo.tabCouleurFin);
    obj3DTranspo.texels = creerTexelsTranspo(objgl, obj3DTranspo.intNbCirconvolutions, intNoTexture);
    obj3DTranspo.maillage = creerMaillageTranspo(objgl, obj3DTranspo.intNbCirconvolutions);

    obj3DTranspo.transformations = creerTransformations();
    changerPos(obj3DTranspo.intX, obj3DTranspo.intZ, obj3DTranspo.transformations);
    return obj3DTranspo;
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

// Ouvreur de Murs Score Et Limite
// Tous ce qui a rapport avec l'Enclos
// Game Over