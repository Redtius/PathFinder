import {GameTerrain} from "./grid.config";
import './styles/main.scss';

// Build the default Board
new GameTerrain(10,10);

// Gets the Board Form
const terrainForm = document.querySelector('#TerrainInput');

// Gets the Data from Form and applies it using an event listener
terrainForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const widthInput = document.querySelector('#width');
  const heightInput = document.querySelector('#height')

  //buildTerrain(heightInput.value,widthInput.value);
  
});





/*
function testAStar() {
  const graph = new Graph(5, 5); // Create a 5x5 grid
  graph.addObstacle({ x: 2, y: 2 }); // Set an obstacle at position (2, 2)
  graph.addObstacle({ x: 3, y: 3 }); // Set another obstacle at position (3, 3)

  const start = { x: 1, y: 1 };
  const end = { x: 2, y: 5 };

  const game = new Game(graph, start, end);
  const result = game.aStar();

  if (result && result.position.x === end.x && result.position.y === end.y) {
    console.log('End node found:', result);
  } else {
    console.log('End node not found or unreachable.');
  }
  console.log("testing");
testAStar();
}*/






