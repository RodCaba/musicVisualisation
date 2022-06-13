class BPMControl extends Control{
  constructor(){
    super();
    this.x = width * (3/4);
    this.y = 400;
    this.step = 0;

    this.handle = {
      width: 30,
      height: 10,
      posX: this.x - 15,
      posY: this.y + 50
    }


    this.draw = function(){
      fill(255);
      strokeWeight(2);
      line(this.x, this.y, this.x, this.y + 100);
      strokeWeight(1);
      textSize(12)
      text("BPM", this.x - 10, this.y - 10);
      rect(this.handle.posX, this.handle.posY, this.handle.width, this.handle.height);
    };
    this.hitCheck = function(){

    };
  }

  mouseDragged(){
    
  }
}