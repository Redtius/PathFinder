

class Node{
  constructor(isObs,position){
    this.isObstacle=isObs;
    this.position=position;
    return this;
  }
}

function buildGraph(height,width){
  let Graph = [];
  for(let i=0;i<height;i++){
    for(let j=0;j<width;j++){
      Graph.push(new Node(false,{x:j,y:i}));
    }
  }
  return Graph;
}

export default buildGraph;