
import {addObstacle,chooseEnd,chooseStart} from './graph.builder';




let counter=0;
class GridRow{
  constructor(height){
    this.width=800;
    this.height=575/height;
    this.verticalGap=50/height;
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
      margin: ${this.verticalGap}px 0px;
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
  constructor(row,width){
    this.width=row.width/width;
    this.height=row.height;
    this.horizontalGap=100/width;
    this.position=this.incrementCurrentPos(width);
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
      margin: 0px ${this.horizontalGap}px;
      
    `;
    card.classList.add('card');

    this.buildListener(card)

    row.appendChild(card);
  }

  buildListener(card){
    card.addEventListener('mousedown',(event)=>{
      if(event.button==0){
        try{
          choosePoints(this.position);
          card.style.backgroundColor='lightblue';
        }
        catch(error)
        {
          console.log(error,"Too many destinations");
        }
      }
      else{
        card.style.backgroundColor='black';
        addObstacle(this.position);
      }
    })
  }
  static restartPosCounter(){
    Card.currentPosition={x:1,y:1};
  }
}

function choosePoints(point){
  if(counter===0){
    chooseStart(point);
  }
  else if(counter===1){
    chooseEnd(point);
  }
  else{
    throw new Error;
  }
  counter++
}

function pointsInit(){
  counter=0;
}

function buildTerrain(height, width) {
  pointsInit();
  Card.restartPosCounter();
  for (let i = 0; i < height; i++) {
    let row = new GridRow(10); // Pass height and width to GridRow constructor
    for (let j = 0; j < width; j++) {
      new Card(row,width);
    }
  }
}

export default buildTerrain;