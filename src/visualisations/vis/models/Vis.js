// Abstract class for Vis 
class Vis{
  constructor(){
    if(this.constructor == Vis){
      throw new Error("Abstract classes can't be instantiated");
    };
    this.name = "Vis";
  }
  draw(){
    throw new Error("Method draw() must be implemented"); 
  }
}