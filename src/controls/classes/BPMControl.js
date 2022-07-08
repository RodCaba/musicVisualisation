class BPMControl extends Control{
  constructor(){
    super();
    this.x = width * (3/4);
    this.y = 400;

    this.gui = createGui('BPM').setPosition(this.x, this.y);
    this.gui.addObject(bpmParams);
    this.draw = function(){
    };
    this.hitCheck = function(){
      sound.rate(bpmParams.playBackRate);
    };
  }
}