class RidgePlots extends Vis {
	constructor() {
		super();
		this.name = 'ridgeplots';

		this.lines = [];
		this.startX = width / 5;
		// As starts from bottom to top;
		this.endY = height / 5;
		this.startY = height - this.endY;
		this.spectrumWidth = (width / 5) * 3;
		// TODO: Update speed when updating the BPM
		this.speed = 0.7;

		this.draw = function () {
			// 1. Draw lines without any output
			/*
        a. work where on the screen to plot DONE
        b. draw lines that move up the screen in regular intervals
          i. Create 2D array of lines add one to the array every x frames. 
          ii. Each frame clear the screen and decrease the y coordinate of each line
          iii. If line y is smaller than plot y then remove from the array. 
      */
			background(0);
			stroke(255);
			strokeWeight(2);
			if (frameCount % 30 === 0) this.addWave();

			for (let i = 0; i < this.lines.length; i++) {
				let o = this.lines[i];
				beginShape();
				for (let j = 0; j < o.length; j++) {
					o[j].y -= this.speed;
					vertex(o[j].x, o[j].y);
				}
				endShape();
				if (o[0].y < this.endY) {
					this.lines.splice(i, 1);
				}
			}
		};

		this.addWave = function () {
			let w = fourier.waveform();
			let outputWave = [];
			let smallScale = 10;
			let bigScale = 80;
			for (let i = 0; i < w.length; i++) {
				// Take only 20th elements of the fourier waveform array
				if (i % 20 == 0) {
					let x = map(
						i,
						0,
						1024,
						this.startX,
						this.startX + this.spectrumWidth
					);
					// Scale if the y is a big or small number
					// If is in the first or last quarter = Low scale mapping
					if (i < 1024 * 0.25 || i > 1024 * 0.75) {
						let y = map(w[i], -1, 1, -smallScale, smallScale);
						outputWave.push({
							x,
							y: this.startY + y,
						});
					} else {
						let y = map(w[i], -1, 1, -bigScale, bigScale);
						outputWave.push({
							x,
							y: this.startY + y,
						});
					}
				}
			}
			this.lines.push(outputWave);
		};
	}
}
