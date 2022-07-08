class KeyBubble{
  key;
  x;
  y;
  constructor(key, x, y){
    this.key = key;
    this.x = x;
    this.y = y
  };

  draw(){
    push();
    fill(0);
    textSize(16);
    text(this.key, this.x, this.y)
    pop();
  }
}