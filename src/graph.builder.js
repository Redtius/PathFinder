
// finds the minimum F score of a given Array of Nodes
function minFscore(openArray){
  let min;
  openArray.forEach(element => {
    if(min===undefined || element.fscore<min.fscore){
      min = element;
    }
  });
  return min;
}

// Checks if the Node is in the Array
function searchNode(openArray,node){
  if(openArray.find(element=>element.position.x===node.position.x && element.position.y===node.position.y))
  return true
  else return false;
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

    let open = []; // Array to store nodes to be explored

    let close = []; // Array to store nodes that have been explored

    open.push(this.start); // Add the start node to the 'open' array

    while(open.length!==0){
      let next = minFscore(open); // Get the node with the minimum f-score from the 'open' array

      open.splice(open.indexOf(next),1); // Remove 'next' node from 'open'

      close.push(next); // Add 'next' node to 'close'

      // If 'next' node is the target end node, we have found the path
      if (next.position.x == this.end.x && next.position.y == this.end.y){
        console.log(next,"Found it!")
        return next;
      }

      // Get the neighboring nodes of 'next' node
      next.voisins(this.graph).forEach((element)=>{
        // Set the g-score, h-score, and f-score for each neighboring node
          element.setScores((next.gscore + next.distance(element)),this.end);

          // Check if the neighboring node is not an obstacle and is not in the 'close' array
          if(!element.isObstacle && !searchNode(close,element)){
            element.setParrentNode(next); // Set the parent node for the neighboring node
            open.push(element); // Add the neighboring node to 'open' for further exploration
          }
      })
    }
    if(open.length===0){
      // If 'open' array is empty and the target end node is not found, return a default node indicating failure
      console.log("can't Find it :( !")
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
    let graph=[];
    for(let i=1;i<=height;i++){
      for(let j=1;j<=width;j++){
        graph.push(new Node({x:j,y:i}));
      }
    }
    return graph;
  }

  findNode(position){
    return this.graph.find(element => element.position.x===position.x && element.position.y===position.y);
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
    this.hscore = Math.abs(end.x-this.position.x)+Math.abs(end.y-this.position.y);
  }
  distance(node){
    return Math.abs(this.position.x-node.position.x)+Math.abs(this.position.y-node.position.y);
  }
  voisins(graph){
    let voisins= [];
    if(this.position.x+1 <= graph.width && this.position.x+1> 0)
    {
      voisins.push(graph.findNode({x:this.position.x+1,y:this.position.y}));
    }
    if(this.position.x-1 > 0 && this.position.x-1 <= graph.width)
    {
      voisins.push(graph.findNode({x:this.position.x-1,y:this.position.y}));
    }
    if(this.position.y+1 <= graph.height && this.position.y+1 > 0)
    {
      voisins.push(graph.findNode({x:this.position.x,y:this.position.y+1}));
    }
    if(this.position.y-1 > 0 && this.position.y-1 <= graph.height)
    {
      voisins.push(graph.findNode({x:this.position.x,y:this.position.y-1}));
    }
    return voisins;
}
}


export {Node,Graph,Game};