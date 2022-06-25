class FileInput extends Control{
  constructor(){
    super();
    this.x = width * (3/4);
    this.y = 70;
    this.textLength = 50;

    this.text = "Load a song to start!";
    this.playing = false;

    this.input = createFileInput(file => {
      if(file.type === "audio"){
        sound = loadSound(file);
        this.changeText(`Now playing: ${file.name}`);
        this.playing = true;
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
  // Getters

  getPlayingState(){
    return this.playing;
  }
  //Setters
  setPlayingState(value){
    this.playing = value;
  }

  setFileInputText (string){
    if(this.playing)
      return;
    // This as when combined with the file input control may cause an error.
    // TODO: fix the bug of combined controls. 
    try{
      let strings = string.split("/");
      let songString = strings[strings.length - 1];
      let splitExtension = songString.split(".mp3");
      let songName = splitExtension[0]
      this.changeText(`Now playing: ${songName}`);
    }catch(e){
      console.log(e);
    }
  };
}