// Import necessary classes from graph.builder.js
import { Game, Graph, Node } from "./graph.builder";

// GridRow class to handle the rows in the grid
class GridRow {
  constructor(height) {
    this.width = 800;
    this.height = 600 / height;
    this.HTMLRow = this.buildRow();
    return this;
  }

  // Function to create a row element and append it to the container
  buildRow() {
    const container = document.querySelector('.container');
    const row = document.createElement('div');

    row.style.cssText = `
      width:${this.width}px;
      height:${this.height}px;
      display: flex;
    `;

    container.appendChild(row);
    return row;
  }
}

// Card class to handle individual grid cells (cards)
class Card {
  // Static property to keep track of the current position during card creation
  static currentPosition = {
    x: 1,
    y: 1
  };

  constructor(row, width, gameTerrain) {
    this.width = row.width / width;
    this.height = row.height;
    this.position = this.incrementCurrentPos(width);
    this.gameTerrain = gameTerrain;
    this.HTMLcard = this.buildCard(row.HTMLRow);
    return this;
  }

  // Function to increment the current position during card creation
  incrementCurrentPos(width) {
    const currentPosition = { ...Card.currentPosition };
    if (currentPosition.x < width) {
      Card.currentPosition.x++;
    } else if (currentPosition.x == width) {
      Card.currentPosition.x = 1;
      Card.currentPosition.y++;
    } else {
      Card.currentPosition.y++;
    }
    return currentPosition;
  }

  // Function to build a card element and attach a click listener
  buildCard(row) {
    const card = document.createElement('span');

    card.style.cssText = `
      width:${this.width}px;
      height:${this.height}px;
    `;
    card.classList.add('card');

    this.buildListener(card);

    row.appendChild(card);
    return card;
  }

  // Static function to reset the current position counter
  static restartPosCounter() {
    Card.currentPosition = { x: 1, y: 1 };
  }

  // Function to add a click listener to the card
  buildListener(card) {
    card.addEventListener('mousedown', (event) => {
      if (event.button == 0) {
        try {
          // Set the point (start or end) based on the counter
          this.gameTerrain.setPoint(this.position);
          card.style.backgroundColor = 'lightblue';
        } catch (error) {
          console.log(error, "Too many destinations");
        }
      } else {
        // Add an obstacle and change the card color to black
        this.gameTerrain.addObs(this.position);
        card.style.backgroundColor = 'black';
      }
    });
  }
}

// GameTerrain class to handle the graphical and virtual game representation
class GameTerrain {
  constructor(height, width) {
    this.start = { x: 0, y: 0 };
    this.end = { x: 0, y: 0 };
    this.counter = 0;
    this.cards = [];
    this.buildTerrain(height, width);
  }

  // Function to set the start and end points in the game
  setPoint(point) {
    if (this.counter === 0) {
      this.start = point;
    } else if (this.counter === 1) {
      this.end = point;
      this.linkToGame();
      this.launchGame();
    } else {
      alert("Restart the game!");
      throw new Error;
    }
    this.counter++;
  }

  // Function to add an obstacle to the game
  addObs(point) {
    this.graph.addObstacle(point);
  }

  // Function to link the game to the A* algorithm
  linkToGame() {
    if (this.start && this.end) {
      this.game = new Game(this.graph, this.start, this.end);
    } else {
      throw new GameInitError;
    }
  }

  // Function to launch the A* algorithm and find the optimal path
  launchGame() {
    let result = this.game.aStar();
    this.reconstructPath(result);
  }

  // Function to reconstruct the path found by A* and update card colors
  reconstructPath(result) {
    let parentNode = result.parentNode;
    while (parentNode.parentNode !== null) {
      let card = this.cards.find(element =>
        element.position.x === parentNode.position.x &&
        element.position.y === parentNode.position.y
      );

      card.HTMLcard.style.backgroundColor = 'rgb(107, 255, 107)';
      parentNode = parentNode.parentNode;
    }
  }

  // Function to clean the container before rebuilding the grid
  cleanContainer() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
  }

  // Function to build the grid terrain and cards
  buildTerrain(height, width) {
    this.cleanContainer();
    Card.restartPosCounter();
    for (let i = 0; i < height; i++) {
      let row = new GridRow(10); // Pass height and width to GridRow constructor
      for (let j = 0; j < width; j++) {
        let card = new Card(row, width, this);
        this.cards.push(card);
      }
    }
    this.graph = new Graph(height, width);
  }
}

// Custom Error class for handling game initialization errors
class GameInitError extends Error {
  constructor() {
    super("Game not Initialized");
    this.name = "GameInitError";
  }
}

// Export GameTerrain class to be used in other modules
export { GameTerrain };
