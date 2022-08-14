class Sand {
	constructor(x, y, speed) {
		this.color = color(255);
		this.x = x;
		this.y = y;
		this.speed = speed;

		this.draw = function () {
			push();
			fill(this.color);
			ellipse(this.x, this.y, 3, 3);
			this.update();
			pop();
		};

		this.update = function () {
			this.y = this.y + this.speed;
		};
	}
  // Getters
  getXValue = function(){
    return this.x;
  }

  getYValue = function(){
    return this.y;
  }

  // Setters
  setXValue = function(value){
    this.x = value;
  }

  setYValue = function(value){
    this.y = value;
  }
}
