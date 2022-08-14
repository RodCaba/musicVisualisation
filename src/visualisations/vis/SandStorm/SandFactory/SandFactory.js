class SandFactory {
	constructor() {
		this.sandParticles = [];
		this.amplitude = new p5.Amplitude();

		this.createSand = function (x, y, speed) {
			this.sandParticles.push(new Sand(x, y, speed));
		};

		this.updateSandValues = function () {
			let amplitudeValue = this.amplitude.getLevel();
			if (amplitudeValue != 0) {
				for (let sand of this.sandParticles) {
					// Update x values
					let x = sand.getXValue();
					let randomValue = random(-8, 8);
					sand.setXValue(x + randomValue * amplitudeValue);
				}
			}
		};
	}
}
