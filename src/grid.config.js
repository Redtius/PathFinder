
import { Game,Graph,Node } from "./graph.builder";

class GridRow{
  constructor(height){
    this.width=800;
    this.height=575/height;
    this.HTMLRow=this.buildRow()
    return this ;
  };
  buildRow(){
    const container = document.querySelector('.container');

    const row = document.createElement('div');

    row.style.cssText=`
      width:${this.width};
      display: flex;
      height:${this.height}px;
    `;

    container.appendChild(row);
    return row;
  }
}

class Card{
  static currentPosition={
    x:1,
    y:1
  };
  constructor(row,width,gameTerrain){
    this.width=row.width/width;
    this.height=row.height;
    this.position=this.incrementCurrentPos(width);
    this.gameTerrain=gameTerrain;
    this.buildCard(row.HTMLRow);
  }
  incrementCurrentPos(width){
    const currentPosition={...Card.currentPosition};
    if(currentPosition.x<width){
      Card.currentPosition.x++;
    }
    else if(currentPosition.x==width){
      Card.currentPosition.x=1;
      Card.currentPosition.y++;
    }
    else{
      Card.currentPosition.y++;
    }
    return currentPosition;
  }

  buildCard(row){
    const card = document.createElement('span');

    card.style.cssText=`
      width:${this.width}px;
      height:${this.height}px;
    `;
    card.classList.add('card');

    this.buildListener(card)

    row.appendChild(card);
  }

  static restartPosCounter(){
    Card.currentPosition={x:1,y:1};
  }

  buildListener(card){
    card.addEventListener('mousedown',(event)=>{
      if(event.button==0){
        try{
          console.log('click0')
          this.gameTerrain.setPoint(this.position);
          card.style.backgroundColor='lightblue';
        }
        catch(error)
        {
          console.log(error,"Too many destinations");
        }
      }
      else{
        console.log('click1')
        this.gameTerrain.addObs(this.position);
        card.style.backgroundColor='black';
      }
    })
  }

}

// the GameTerrain (Graphical + Virtual)
class GameTerrain{
  constructor(height,width){
    this.buildTerrain(height,width);
    this.start={x:0,y:0};
    this.end={x:0,y:0};
    this.counter = 0;
  }

  setPoint(point){
    if(this.counter===0){
      this.start=point;
    }
    else if(this.counter===1){
      this.end=point;
      this.linkToGame();
      this.launchGame();
    }
    else{
      throw new Error;
    }
    this.counter++
  }

  addObs(point){
    this.graph.addObstacle(point);
  }

  linkToGame(){
    if(this.start && this.end){
        this.game= new Game(this.graph,this.start,this.end);
    }
    else{
      throw new GameInitError;
    }
  }

  launchGame(){
    let result = this.game.aStar();
    this.reconstructPath(result);
  }

  reconstructPath(result){
    console.log(result);
  }

  cleanContainer(){
    const container = document.querySelector('.container');
    container.innerHTML = '';
  }
  
  buildTerrain(height, width) {
    this.cleanContainer();
    Card.restartPosCounter();
    for (let i = 0; i < height; i++) {
      let row = new GridRow(10); // Pass height and width to GridRow constructor
      for (let j = 0; j < width; j++) {
        new Card(row,width,this);
      }
    }
    this.graph= new Graph(height,width);
  }
}

class GameInitError extends Error{
  constructor(){
    super("Game not Initialised");
    this.name="GameInitError"
  }
}


export {GameTerrain}