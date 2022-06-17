class Blocks extends Vis {
  constructor(){
    super();
    this.name = 'blocks'
    
    this.noiseStep = 0.01;
    this.prog = 0;

    this.draw = function(){
      fourier.analyze();
      let energy = fourier.getEnergy('bass');
      push();
      translate(width/2, height/2);
      
      beginShape();
      noFill();
      stroke(0, 255, 0);
      for(let i = 0; i < 100; i++){
        let x = map(noise(i * this.noiseStep + this.prog), 0, 1, -250, 250);
        let y = map(noise(i * this.noiseStep + this.prog + 1000), 0, 1, -250, 250);
        vertex(x, y);
      }

      endShape();
      if(energy > 180){
        this.prog += 0.05;
      }
      pop();
    }
  }

}