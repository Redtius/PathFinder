
// finds the minimum F score of a given Array of Nodes
function minFscore(openSet){
  let min;
  for(const item of openSet){
    if(min===undefined || item.fscore<min.fscore){
      min = item;
    }
  }
  return min;
}

// Game class to handle the A* algorithm and pathfinding
class Game{
  constructor(graph,start,end){
    
    this.graph=graph; // The graph that holds the nodes and their relationships
    this.start=new Node(start); // The starting node with the given 'start' position
    this.end=end; // The target position for the end node
  }

  // Setter methods to update the start and end nodes

  setStart(start){
    this.start=start;
  }
  setEnd(end){
    this.end=end;
  }

  // A* algorithm to find the optimal path from the start node to the end node
  aStar(){
    // Initialize the scores for the start node
    this.start.setScores(0,this.end)

    let open = new Set(); // Array to store nodes to be explored

    let close = new Set(); // Array to store nodes that have been explored

    open.add(this.start); // Add the start node to the 'open' array
    console.log(open);
    while(open.size!==0){
      let next = minFscore(open); // Get the node with the minimum f-score from the 'open' array

      open.delete(next); // Remove 'next' node from 'open'

      close.add(next); // Add 'next' node to 'close'
      console.log(open,close);
      // If 'next' node is the target end node, we have found the path
      if (next.position.x == this.end.x && next.position.y == this.end.y){
        console.log('found it',next);
        return next;
      }

      // Get the neighboring nodes of 'next' node
      for(const element of next.voisins(this.graph)){
        // Set the g-score, h-score, and f-score for each neighboring node
          element.setScores((next.gscore + next.distance(element)),this.end);
          console.log('here')
          // Check if the neighboring node is not an obstacle and is not in the 'close' array
          if(!element.isObstacle && !close.has(element)){
            element.setParrentNode(next); // Set the parent node for the neighboring node
            open.add(element); // Add the neighboring node to 'open' for further exploration
          }
      }
      console.log('here2')
    }
    if(open.size===0){
      // If 'open' array is empty and the target end node is not found, return a default node indicating failure
      alert('The End Point is Unreachable!')
      return new Node({x:-1,y:-1});
    }
    }
  
  }
class Graph{
  constructor(height,width){
    this.height=height;
    this.width=width;
    this.graph = this.buildGraph(height,width);
  }

  buildGraph(height,width){
    let graph=new Set();
    for(let i=1;i<=height;i++){
      for(let j=1;j<=width;j++){
        graph.add(new Node({x:j,y:i}));
      }
    }
    return graph;
  }

  findNode(position){
    for(const node of this.graph){
      if(node.position.x === position.x && node.position.y === position.y){
        return node;
      } 
    }
  }

  addObstacle(position){
    const node = this.findNode(position);
    node.isObstacle=true;
  }
}

class Node{
  constructor(position){
    this.isObstacle=false;
    this.position=position;
    this.parentNode=null;
    this.fscore=Infinity;
    this.gscore=Infinity;
    this.hscore=Infinity;
  }
  setParrentNode(node){
    this.parentNode=node;
  }
  setScores(gscore,end){
    this.setGscore(gscore);
    this.setHscore(end);
    this.setFscore();
  }
  setFscore(){
    this.fscore = this.gscore+this.hscore;
  }
  setGscore(gscore){
    this.gscore = gscore;
  }
  setHscore(end){
    this.hscore = Math.sqrt((end.x-this.position.x)**2 + (end.y-this.position.y)**2); // Euclidean Distance
  }
  distance(node){
    return Math.abs(this.position.x-node.position.x)+Math.abs(this.position.y-node.position.y);
  }
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


export {Node,Graph,Game};