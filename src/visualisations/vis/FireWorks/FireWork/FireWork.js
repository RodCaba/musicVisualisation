class FireWork {
  constructor(colour, x, y){
    this.colour = colour;
    this.x = x;
    this.y = y;
    this.particles = [];
    this.depleted = false;
    for(let i = 0; i < 360; i+= 18){
      let randomSpeed = random(3, 9);
      this.particles.push(new Particle(x, y, colour, i, randomSpeed));
    }

    this.draw = function(){
      for(let particle of this.particles){
        particle.draw();
        particle.update();
        if(particle.speed <= 0){
          this.depleted = true;
        }
      }
    }
  };
  
}