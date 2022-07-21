class Circle extends Vis{
  constructor(){
    super();
    this.name = "circle";

    this.x = width/2;
    this.y = height/2;
    this.step = 1;

    let radii = 100;

    let radiiMinValue = 150;
    let radiiMaxValue = 400;

    let ampRateMinValue = -10;
    let ampRateMaxValue = 10;

    let amplitude = new p5.Amplitude();

    // We will create a new FFT object since we will loop over it to create a variation over the amplitude values.
    // If we keep the global fourier value, the circle would be over drawn. 
    let fft = new p5.FFT(0.8, 512);
  
    this.draw = function(){
      push();
      noFill();
      strokeWeight(1);
      // The LINES version of beginShape gives the visualisation a more "alive" feel
      beginShape(LINES); 
      stroke(255, 215, 0);
      this.updateFrameStep();
      let amplitudeValues = fft.analyze();
      for(let i = 0; i < 512; i += this.step){
        this.update();
        let ampRate = map(amplitudeValues[i], 0, 255, ampRateMinValue, ampRateMaxValue);
        let pointX = this.x +(radii * sin(i)) + ampRate;
        let pointY = this.y +(radii * cos(i)) + ampRate;
        vertex(pointX, pointY);
      }
      endShape();
      pop();
    };

    // This updates the radii according to the amplitude level
    this.update = function(){
      let level = amplitude.getLevel();
      radii = map(level, 0, 1, radiiMinValue, radiiMaxValue );
    };

    this.updateFrameStep = function(){
      if(frameCount % 1200 == 0)
        this.step++;
      if(this.step > 10)
        this.step = 1;
    }
  };

}