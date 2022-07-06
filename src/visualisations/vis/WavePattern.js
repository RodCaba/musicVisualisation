//draw the waveform to the screen
class WavePattern extends Vis {
	constructor() {
		//vis name
		super();
		this.name = "wavepattern";
		this.colour = color(255, 0, 0);

		//draw the wave form to the screen
		this.draw = function () {
			push();
			noFill();
			strokeWeight(1);
			
			beginShape();
			//calculate the waveform from the fft.
			let wave = fourier.waveform();
			for (let i = 0; i < wave.length; i+=8) {
				stroke(this.colour);
				//for each element of the waveform map it to screen
				//coordinates and make a new vertex at the point.
				let x = map(i, 0, wave.length, 0, width);
				let y = map(wave[i], -1, 1, height * (1/4), height * (3/4));

				vertex(x, y);
			}

			endShape();
			pop();
			this.update();
		};

		this.update = function(){
			if(frameCount % 1200 == 0)
				this.colour = color(random(0, 255), random(0, 255), random(0, 255));
		}
	}
}