import { node } from "webpack";

let start={x:0,y:0};
let end = {x:0,y:0};
//calculate g in each iteration
function minFscore(openArray){
  let min;
  openArray.forEach(element => {
    if(min===undefined || element.fscore()<min.fscore()){
      min = element;
    }
  });
  return min;
}

class Game{
  constructor(graph,start,end){
    this.graph=graph;
    this.start={start,gscore:0};
    this.end=end;
    return this;
  }
  setStart(start){
    this.start=start;
  }
  setEnd(end){
    this.end=end;
  }
  aStar(){

    let open = [this.start];
    let count = 0;

    while(open.length!==0){
      let next = minFscore(open);
      open.splice(open.indexOf(next),1)
      if (next == this.end){

      }
      next.voisins(this.graph).forEach((element)=>{
          element.gScore = next.gScore + next.distance(element);
          if(!element.isObstacle && !open.findNode(element)){
            open.push(element);
          }
      })
    }
    }
  
  }
class Graph{
  constructor(height,width){
    this.height=height;
    this.width=width;
    this.graph = this.buildGraph(height,width);
    return this;
  }

  buildGraph(height,width){
    let graph=[];
    for(let i=1;i<=height;i++){
      for(let j=1;j<=width;j++){
        graph.push(new Node(false,{x:j,y:i}));
      }
    }
    return graph;
  }

  findNode(position){
    return this.find(element => element.position.x===position.x && element.position.y===position.y);
  }

  addObstacle(position){
    const node = this.findNode(position);
    node.isObstacle=true;
  }
}
  



class Node{
  constructor(isObs,position){
    this.isObstacle=isObs;
    this.position=position;
    return this;
  }
  setParrentNode(node){
    this.parentNode=node;
  }
  distance(node){
    return Math.abs(thid.position.x-node.x)+Math.abs(this.position.y-node.y);
  }
  hscore(end){
    return Math.abs(end.x-this.position.x)+Math.abs(end.y-this.position.y);
  }
  voisins(graph){
    let voisins= [];
    if(this.position.x+1 <= graph.width)
    {
      voisins.push(graph.findNode({x:this.position.x+1,y:this.position.y}));
    }
    if(this.position.x-1 > 0)
    {
      voisins.push(graph.findNode({x:this.position.x-1,y:this.position.y}));
    }
    if(this.position.y+1 <= graph.height)
    {
      voisins.push(graph.findNode({x:this.position.x,y:this.position.y+1}));
    }
    if(this.position.y-1 > 0)
    {
      voisins.push(graph.findNode({x:this.position.x,y:this.position.y-1}));
    }
    return voisins;
}
}







// calculates F score
//calculates G score

//calculates H score
//algorithme Function


export {addObstacle,chooseEnd,chooseStart,buildGraph};