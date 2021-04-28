

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
            tabJeu[intX][intZ] = 'D';
            console.log('intX: '+intX+" intZ: "+intZ);
            console.ietable(tabJeu);
            /**TODO:
             * -Ajouter un effet sonore
             * -Enlever un ouvreur de mur
             */
            
        }
    });
  }

  // Pour print un tableau en console sur IE
console.ietable = function(data, columns) {
  if (data.constructor === Object) {
    if (typeof columns != "object") {
      var columns = [];
      for (var index in data) {
        for (var prop in data[index]) {
          if (columns.indexOf(prop) == -1) {
            columns.push(prop);
          }
        }
      }
    } else {
      var header = "index" 
      for (var p in columns) {
        header += " | ";
        header += columns[p];
      }
      console.log(header);
    }

    for (var obj in data) {
      var entry = data[obj];
      var entryStr = obj+"";
      for (var j = 0; j < columns.length; j++) {
        entryStr += " | ";
        entryStr += entry[columns[j]];
      }
      console.log(entryStr);
    }

  } else if (data.constructor === Array) {
    if (typeof columns != "object") {
      var columns = [];
      for (var index in data) {
        for (var prop in data[index]) {
          if (columns.indexOf(prop) == -1) {
            columns.push(prop);
          }
        }
      }
    } else {
      var header = "index" 
      for (var p in columns) {
        header += " | ";
        header += columns[p];
      }
      console.log(header);
    }

    for (var i = 0; i < data.length; i++) {
      var entry = data[i];
      var entryStr = i+"";
      for (var j = 0; j < columns.length; j++) {
        entryStr += " | ";
        entryStr += entry[columns[j]];
      }
      console.log(entryStr);
    }
  }
}
