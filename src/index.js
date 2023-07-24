import {GameTerrain} from "./grid.config";
import './styles/main.scss';

// Creates an initial Terrain
new GameTerrain(10,10);

// Adding Event Listener To the Reset Button
const reset = document.querySelector('.reset');

reset.addEventListener('click',()=>{
  new GameTerrain(10,10);
})








