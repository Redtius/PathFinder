import buildTerrain from "./grid.config";
import './styles/main.scss';
import {buildGraph} from "./graph.builder";


// Cleans the Board/Terrain
function cleanContainer(){
  const container = document.querySelector('.container');
  container.innerHTML = '';
}

buildGraph(5,5);
// Build the default Board
buildTerrain(5,5);

// Gets the Board Form
const terrainForm = document.querySelector('#TerrainInput');

// Gets the Data from Form and applies it using an event listener
terrainForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const widthInput = document.querySelector('#width');
  const heightInput = document.querySelector('#height')

  cleanContainer();
  buildGraph(heightInput.value,widthInput.value);
  buildTerrain(heightInput.value,widthInput.value);
  
});