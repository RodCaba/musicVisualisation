class FullscreenButton extends Control{
  constructor(){
    super();
    this.x = 20;
    this.y = 60;
    this.width = 20;
    this.height = 20;

    this.draw = function (){
      noFill();
      strokeWeight(4);
      stroke(255);
      rect(this.x, this.y, this.width, this.height);
      strokeWeight(1);
      textSize(9)
      text("FS", this.x + (this.width/2) - 5, this.y + (this.height/2)+2)
    }

    this.hitCheck = function (){
      if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
        let fs = fullscreen();
        fullscreen(!fs);
      }
    }
  }
}