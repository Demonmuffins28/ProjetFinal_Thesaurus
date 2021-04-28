

function initNiveau() {
    let tabObjets3D = new Array();

    for (i=0; i< tabJeu.length; i++) {
        for (j = 0; j < tabJeu[i].length; j++) {
            if (tabJeu[i][j] == 'R') {
                const objMurOuvrable = creerObj3DMur(objgl, TEX_MUR_OUVRABLE, j, i, true);
                tabObjets3D.push(objMurOuvrable);
            }
            if (tabJeu[i][j] == 'V') {
                const objMurNonOuvrable = creerObj3DMur(objgl, TEX_MUR_OUVRABLE, j, i, false);
                tabObjets3D.push(objMurNonOuvrable);
            }
        }
    }
    return tabObjets3D;
}