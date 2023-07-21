
let start={x:0,y:0};
let end = {x:0,y:0};


function minFscore(openArray){
  let min;
  openArray.forEach(element => {
    if(min===undefined || element.fscore<min.fscore){
      min = element;
    }
  });
  return min;
}

function searchNode(openArray,node){
  if(openArray.find(element=>element.position.x===node.position.x && element.position.y===node.position.y))
  return true
  else return false;
}

class Game{
  constructor(graph,start,end){
    this.graph=graph;
    this.start=new Node(start);
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

    this.start.setScores(0,this.end)
    let open = [];
    let close = [];
    open.push(this.start);
    while(open.length!==0){
      let next = minFscore(open);
      open.splice(open.indexOf(next),1);
      close.push(next);
      if (next.position.x == this.end.x && next.position.y == this.end.y){
        console.log(next,"Found it!")
        return next;
      }
      console.log(next.voisins(this.graph))
      next.voisins(this.graph).forEach((element)=>{
          element.setScores((next.gscore + next.distance(element)),this.end);
          if(!element.isObstacle && !searchNode(close,element)){
            element.setParrentNode(next);
            open.push(element);
          }
      })
    }
    if(open.length===0){
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