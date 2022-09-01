class NoiseLines extends Vis {
	constructor() {
		super();
		this.name = 'noiseLines';

		this.noiseStep = 0.03;
		this.progBass = 0;
		this.progLMid = 0;
		this.progHMid = 0;
		this.progTreble = 0;

		this.draw = function () {
			fourier.analyze();
			let bassEnergy = fourier.getEnergy('bass');
			let lowMidEnergy = fourier.getEnergy('lowMid');
			let highMidEnergy = fourier.getEnergy('highMid');
			let trebleEnergy = fourier.getEnergy('treble');

			push();
			translate(width / 2, height / 2);

			// Small red figure for high mid range
			// Medium green figure for low mid range
			// Big blue figure for bass range

			noFill();
			// Yellow figure for treble range
			beginShape();
			stroke(255, 255, 0);
			for(let i =0; i < 100; i++){
				let x = map(
					noise(i * this.noiseStep + this.progTreble),
					0,
					1,
					-600,
					-400
				);
				// The range of the y axis would increase as the bass energy increases.
				let y = map(
					noise(i * this.noiseStep + this.progTreble + 50 ),
					0,
					1,
					-75,
					75
				);
				vertex(x, y);
			}
			endShape();

			// Red figure for high mid range
			beginShape();
			stroke(255, 0, 0);
			for (let i = 0; i < 100; i++) {
				let x = map(
					noise(i * this.noiseStep + this.progHMid),
					0,
					1,
					-400,
					-100
				);
				let y = map(
					noise(i * this.noiseStep + this.progHMid + 100),
					0,
					1,
					-150,
					150
				);
				vertex(x, y);
			}
			endShape();

			// Green figure for low mid range
			beginShape();
			stroke(0, 255, 0);
			for (let i = 0; i < 100; i++) {
				let x = map(noise(i * this.noiseStep + this.progLMid), 0, 1, -100, 200);
				let y = map(
					noise(i * this.noiseStep + this.progLMid + 150),
					0,
					1,
					-300,
					300
				);
				vertex(x, y);
			}
			endShape();

			// Blue figure for bass range
			beginShape();
			stroke(0, 0, 255);
			for (let i = 0; i < 100; i++) {
				let x = map(noise(i * this.noiseStep + this.progHMid), 0, 1, 200, 700);
				let y = map(
					noise(i * this.noiseStep + this.progHMid + 1000),
					0,
					1,
					-500,
					500
				);
				vertex(x, y);
			}
			endShape();

			// Checking the energy tresholds, if it passes then the progression is added. 
			if (bassEnergy > 80) {
				this.progBass += 0.05;
			}
			if (lowMidEnergy > 180) {
				this.progLMid += 0.05;
			}
			if (highMidEnergy > 80) {
				this.progHMid += 0.05;
			}
			if (trebleEnergy > 80){
				this.progTreble += 0.05;
			}
			pop();
		};
	}
}
