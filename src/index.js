import {GameTerrain} from "./grid.config";
import './styles/main.scss';

new GameTerrain(10,10);


const reset = document.querySelector('.reset');

reset.addEventListener('click',()=>{
  new GameTerrain(10,10);
})








