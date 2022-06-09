class FileInput extends Control{
  constructor(){
    super();
    this.x = width * (3/4);
    this.y = 100;

    this.text = "Load a song to start!";

    this.input = createFileInput(file => {
      if(file.type === "audio"){
        sound = loadSound(file);
        console.log(file);
      }
      else{
        console.log("Fail")
        this.drawFileError()
      }
    });
    this.input.position(this.x, this.y);
    this.self = this;
  };
  
  handleFile(file){
    if(file.type === "audio"){
      sound = loadSound(file);
    }
  };

  draw(){
    fill(255);
    textSize(32);
    text(this.text, this.x, this.y)
  }

  hitCheck(){
    return;
  }
  
  drawFileError(){
    fill("white");
    stroke("white");
    strokeWeight(2);
    textSize(34);
    text("Please, upload a valid sound file", this.x, this.y)
  };

  changeText(string){
    this.text = string;
  }
}