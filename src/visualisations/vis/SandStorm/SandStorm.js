// The visualisation would be particles of white sand comming form top to bottom of the page.
// Then it will have some variation according to the music
// It can even go reverse with particles comming from botton to top

class SandStorm extends Vis {
	constructor() {
		super();
		this.name = 'sandStorm';
		this.sandFactory = new SandFactory();

		this.draw = function () {
			for (let i = 0; i < this.sandFactory.sandParticles.length; i++) {
				this.sandFactory.sandParticles[i].draw();
				if (this.sandFactory.sandParticles[i].getYValue() > height)
					this.sandFactory.sandParticles.splice(i, 1);
			}
			if (this.sandFactory.sandParticles.length > 1000){
        return;
      } 
      
			let randomX = random(0, width);
			let randomSpeed = random(0.2, 0.7);
			this.sandFactory.createSand(randomX, 0, randomSpeed);
			this.sandFactory.updateSandValues();
		};
	}
}
