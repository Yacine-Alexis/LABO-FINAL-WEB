# node, npm, babel et webpack

## Nodejs
Permet d’exécuter du JavaScript sans navigateur. 

Par exemple, si vous vous faites un fichier hello.js, et qu'à l'intérieur vous faites : 
````
console.log("hello world");
````

Dans un terminal, vous pourriez l'exécuter via la commande suivante :

> node main.js

## npm
npm permet de :
-	Gérer les dépendances d’un projet JavaScript (librairies externes).
-	Faire des bundles (1 fichier de sortie (*output*) à partir de plusieurs fichiers sources (*inputs*) )
-	Générer du code rétro compatible avec les vieux navigateurs


### Webpack – Faire un bundle du code JavaScript

Définition : *webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.*

Au départ : 
> npm init

> npm install webpack webpack-cli --save-dev


Puis ajouter un script dans package.json
````
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack" : "webpack --watch"
  },
````

Ensuite, ajouter le fichier de configuration webpack.config.js :
```` 
const path = require('path');

module.exports = {
  entry: {
    index : './src/index.js',
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```` 

Pour démarrer webpack

> npm run webpack

Ceci fait un bundle du JavaScript puis le mettre dans le fichier dist/index.js, donc dans le fichier index.html : 

````
<script src="dist/index.js"></script> (pas src/index.js)
````

### Utilisation de modules (import/export)

Important : Les variables globales ne sont plus visibles entre les différents fichiers

Quand on veut accéder à une fonction/classe d’un autre fichier, on doit ajouter « export » avant la classe/fonction à utiliser.

````
export const generateAsciiArt = () => { …}
````

Il est ensuite disponible dans le fichier, via la commande import

````
import { generateAsciiArt } from './utils.js';

window.addEventListener("load", () => {
    generateAsciiArt();
})
````


#### Exemple d'importation en utilisation de default

.src/index.js
````
import {Algorithm} from './Algorithm.s';

let algo = new Algorithm();
````

Ou encore en utilisant « default »

````
export default class Algorithm {
…
}
````

````
import Algorithm from './Algorithm.s';

let algo = new Algorithm();
````


