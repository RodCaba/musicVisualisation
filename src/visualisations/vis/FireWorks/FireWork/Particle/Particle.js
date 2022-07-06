class Particle{
  constructor(x, y, colour, angle, speed){
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.angle = angle;
    this.speed = speed;

    this.draw = function(){
      fill(this.colour);
      ellipse(this.x, this.y, 5, 5);
      this.update();
    }

    this.update = function(){
      this.speed -= 0.1;
      // Use the triangle rectangle formula to update x and y
      this.x += cos(this.angle) * this.speed;
      this.y += sin(this.angle) * this.speed;
    }
  } 
}