

/**Détruit l'objet au coordonnées suivantes si l'objet est ouvrable
 * 
 * @param {number} intX Coordonnées X
 * @param {number} intZ Coordonnées Z
 */
function destruireMur(intX, intZ) {
    objScene3D.tabObjets3D.forEach(function(objet) {
      if(objet.intX == intX && objet.intZ == intZ)
        if(objet.binOuvrable == true) {
            objet.binVisible = false;
            /**TODO:
             * -Ajouter un effet sonore
             * -Enlever un ouvreur de mur
             */
            
        }
    });
  }
