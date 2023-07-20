const Start={x:0,y:0};
const end = {x:0,y:0};

let graph = [];

function chooseStart(){

}

function chooseEnd(){

}



class Node{
  constructor(isObs,position){
    this.isObstacle=isObs;
    this.position=position;
    return this;
  }
}

function buildGraph(height,width){
  graph=[];
  for(let i=1;i<=height;i++){
    for(let j=1;j<=width;j++){
      graph.push(new Node(false,{x:j,y:i}));
    }
  }
  return graph;
}


function addObstacle(position){
  const node = graph.find(element => element.position.x===position.x && element.position.y===position.y)
  node.isObstacle=true;
  console.log(graph)
}

export {addObstacle,chooseEnd,chooseStart,buildGraph};