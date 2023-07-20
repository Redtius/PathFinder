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
  constructor(row,width){
    this.width=row.width/width;
    this.height=row.height;
    this.horizontalGap=100/width;
    this.buildCard(row.HTMLRow);
  }
  buildCard(row){
    const card = document.createElement('span');

    card.style.cssText=`
      width:${this.width}px;
      height:${this.height}px;
      margin: 0px ${this.horizontalGap}px;
      
    `;
    card.classList.add('card');
    row.appendChild(card);
  }

}

function buildTerrain(height, width) {
  for (let i = 0; i < height; i++) {
    let row = new GridRow(10); // Pass height and width to GridRow constructor
    for (let j = 0; j < width; j++) {
      new Card(row,width);
      console.log(row.height) // Pass width and height to Card constructor
    }
  }
}

export default buildTerrain;