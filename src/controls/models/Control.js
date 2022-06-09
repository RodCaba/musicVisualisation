class Control{
  constructor(){
    if(this.constructor == Control){
      throw new Error("Abstract classes can't be instantiated");
    };
    this.x = 0;
    this.y = 0;
  }
}