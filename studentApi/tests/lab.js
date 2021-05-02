const fs = require('fs');

var view = fs.readFileSync('templates/test2.aston');
var title = 'test2';
var viewStr = view.toString();

// simulation template engine: recherche en substitution
// ToDO: utiliser une expression régulière
// pour faire un replaceALl
var newView = 
  viewStr
    .replace('[[ title ]]', title)
    .replace('[[ title ]]', title);

console.log(newView);