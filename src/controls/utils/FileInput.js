class FileInput extends Control{
  constructor(){
    super();
    this.x = 100;
    this.y = 100;

    this.input = createFileInput(this.handleFile);
    this.input.position(this.x, this.y);
    this.self = this;
  };
  
  handleFile(file, self = this){
    if(file.type === "audio"){
      sound = loadSound(file);
    }
    else{
      self.drawFileError();
    }
  };
  
  drawFileError(){
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(34);
    text("Please, upload a valid sound file", 500, 500)
  };
}