// Function to find the node with the minimum F-score from a given Set of Nodes
function minFscore(openSet) {
  let min;
  for (const item of openSet) {
    if (min === undefined || item.fscore < min.fscore) {
      min = item;
    }
  }
  return min;
}

// Game class to handle the A* algorithm and pathfinding
class Game {
  constructor(graph, start, end) {
    this.graph = graph; // The graph that holds the nodes and their relationships
    this.start = new Node(start); // The starting node with the given 'start' position
    this.end = end; // The target position for the end node
  }

  // Setter methods to update the start and end nodes
  setStart(start) {
    this.start = start;
  }

  setEnd(end) {
    this.end = end;
  }

  // A* algorithm to find the optimal path from the start node to the end node
  aStar() {
    // Initialize the scores for the start node
    this.start.setScores(0, this.end);

    let open = new Set(); // Set to store nodes to be explored
    let close = new Set(); // Set to store nodes that have been explored

    open.add(this.start); // Add the start node to the 'open' set
    console.log(open);

    while (open.size !== 0) {
      let next = minFscore(open); // Get the node with the minimum f-score from the 'open' set
      open.delete(next); // Remove 'next' node from 'open'
      close.add(next); // Add 'next' node to 'close'
      console.log(open, close);

      // If 'next' node is the target end node, we have found the path
      if (next.position.x === this.end.x && next.position.y === this.end.y) {
        console.log('found it', next);
        return next;
      }

      // Get the neighboring nodes of 'next' node
      for (const element of next.voisins(this.graph)) {
        // Set the g-score, h-score, and f-score for each neighboring node
        element.setScores(next.gscore + next.distance(element), this.end);
        console.log('here');

        // Check if the neighboring node is not an obstacle and is not in the 'close' set
        if (!element.isObstacle && !close.has(element)) {
          element.setParrentNode(next); // Set the parent node for the neighboring node
          open.add(element); // Add the neighboring node to 'open' for further exploration
        }
      }
      console.log('here2');
    }

    if (open.size === 0) {
      // If 'open' set is empty and the target end node is not found, return a default node indicating failure
      alert('The End Point is Unreachable!');
      return new Node({ x: -1, y: -1 });
    }
  }
}

// Graph class to represent the grid and handle nodes
class Graph {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.graph = this.buildGraph(height, width);
  }

  // Function to build the graph of nodes
  buildGraph(height, width) {
    let graph = new Set();
    for (let i = 1; i <= height; i++) {
      for (let j = 1; j <= width; j++) {
        graph.add(new Node({ x: j, y: i }));
      }
    }
    return graph;
  }

  // Function to find a node based on its position
  findNode(position) {
    for (const node of this.graph) {
      if (node.position.x === position.x && node.position.y === position.y) {
        return node;
      }
    }
  }

  // Function to add an obstacle to a node
  addObstacle(position) {
    const node = this.findNode(position);
    node.isObstacle = true;
  }
}

// Node class to represent individual grid cells
class Node {
  constructor(position) {
    this.isObstacle = false;
    this.position = position;
    this.parentNode = null;
    this.fscore = Infinity;
    this.gscore = Infinity;
    this.hscore = Infinity;
  }

  // Function to set the parent node for the current node
  setParrentNode(node) {
    this.parentNode = node;
  }

  // Function to set the g-score, h-score, and f-score for the current node
  setScores(gscore, end) {
    this.setGscore(gscore);
    this.setHscore(end);
    this.setFscore();
  }

  // Function to calculate the f-score based on the g-score and h-score
  setFscore() {
    this.fscore = this.gscore + this.hscore;
  }

  // Function to set the g-score for the current node
  setGscore(gscore) {
    this.gscore = gscore;
  }

  // Function to set the h-score for the current node using the Euclidean distance
  setHscore(end) {
    this.hscore = Math.sqrt((end.x - this.position.x) ** 2 + (end.y - this.position.y) ** 2);
  }

  // Function to calculate the distance between the current node and another node
  distance(node) {
    return Math.abs(this.position.x - node.position.x) + Math.abs(this.position.y - node.position.y);
  }

  // Function to get neighboring nodes (voisins) of the current node
  voisins(graph) {
    let voisins = [];
    let isYplus = this.position.y + 1 <= graph.height && this.position.y + 1 > 0;
    let isYmines = this.position.y - 1 > 0 && this.position.y - 1 <= graph.height;

    if (this.position.x + 1 <= graph.width && this.position.x + 1 > 0) {
      voisins.push(graph.findNode({ x: this.position.x + 1, y: this.position.y }));
    }
    if (this.position.x - 1 > 0 && this.position.x - 1 <= graph.width) {
      voisins.push(graph.findNode({ x: this.position.x - 1, y: this.position.y }));
    }
    if (isYplus) {
      voisins.push(graph.findNode({ x: this.position.x, y: this.position.y + 1 }));
    }
    if (isYmines) {
      voisins.push(graph.findNode({ x: this.position.x, y: this.position.y - 1 }));
    }

    return new Set(voisins); // Convert the array of neighbors to a Set
  }
}

// Export Node, Graph, and Game classes to be used in other modules
export { Node, Graph, Game };
