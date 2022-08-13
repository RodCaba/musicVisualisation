class Effect{

  constructor(name, color, secondaryColor, effect, processParams, unProcessParams){
    this.name = name;
    this.color = color;
    this.secondaryColor = secondaryColor;
    this.effect = effect;
    this.pressedState = false;

    this.onPressed = function(){
      if(mouseIsPressed){
        this.effect.process(...processParams);
        this.pressedState = true;
      } else{
        this.effect.process(...unProcessParams);
        this.pressedState = false;
      }
    }
  }
}