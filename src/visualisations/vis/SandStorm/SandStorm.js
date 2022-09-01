// The visualisation would be particles of white sand comming form top to bottom of the page.
// Then it will have some variation according to the music
// It can even go reverse with particles comming from botton to top

class SandStorm extends Vis {
	constructor() {
		super();
		this.name = 'sandStorm';
		this.sandFactory = new SandFactory();
		this.reverse = false;

		this.reverseText = {
			x: 330,
			y: 20,
			width: 100,
			height: 50,
			text: 'Reverse!',
			activeColor: color(255, 215, 0),
			defaultColor: color(255),
			textSize: 16,
		};

		this.draw = function () {
			for (let i = 0; i < this.sandFactory.sandParticles.length; i++) {
				this.sandFactory.sandParticles[i].draw();
				if (
					this.sandFactory.sandParticles[i].getYValue() > height &&
					!this.reverse
				)
					this.sandFactory.sandParticles.splice(i, 1);
				else if (
					this.sandFactory.sandParticles[i].getYValue() < 0 &&
					this.reverse
				) {
					this.sandFactory.sandParticles.splice(i, 1);
				}
			}

			push();
			if (this.reverse) fill(this.reverseText.activeColor);
			else fill(this.reverseText.defaultColor);
			rect(
				this.reverseText.x,
				this.reverseText.y,
				this.reverseText.width,
				this.reverseText.height
			);
			textSize(this.reverseText.textSize);
			fill(0);
			let textXPosition = this.reverseText.x + this.reverseText.width / 6;
			let textYPosition = this.reverseText.y + this.reverseText.height / 1.8;
			text(this.reverseText.text, textXPosition, textYPosition);
			pop();

			if (this.sandFactory.sandParticles.length > 10000) {
				this.sandFactory.updateSandValues();
				return;
			}

			let randomX = random(0, width);
			let randomSpeed;

			// Y value and speed params are inverted if reverse is set to true
			let y = 0;
			if (this.reverse) y = height;

			if (this.reverse) randomSpeed = random(-0.4, -0.9);
			else randomSpeed = random(1, 3);

			this.sandFactory.createSand(randomX, y, randomSpeed);
			this.sandFactory.updateSandValues();
		};
		this.hitCheck = function () {
			if (
				mouseX > this.reverseText.x &&
				mouseX < this.reverseText.x + this.reverseText.width &&
				mouseY > this.reverseText.y &&
				mouseY < this.reverseText.y + this.reverseText.height
			) {
				console.log('reverse');
				this.reverse = !this.reverse;
			}
		};
	}
}
