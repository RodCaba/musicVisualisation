class FileInput extends Control{
  constructor(){
    super();
    this.x = width * (3/4);
    this.y = 70;
    this.textLength = 50;

    this.text = "Load a song to start!";

    this.input = createFileInput(file => {
      if(file.type === "audio"){
        sound = loadSound(file);
        this.changeText(`Now playing: ${file.name}`);
      }
      else{
        console.log("Fail")
      }
    });
    this.input.position(this.x, this.y);
    this.handleFile = function (file){
      if(file.type === "audio"){
        sound = loadSound(file);
      }
    };

    this.draw = function(){
      fill(255);
      textSize(16);
      text(this.text, this.x - 100, this.y - 20)
    };
    this.hitCheck = function (){
      return;
    };
    this.changeText = function(string){
      if(string.length > this.textLength)
        this.text = string.slice(0, this.textLength) + "...";
      else
        this.text = string;
    };
  };

}