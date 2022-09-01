class Spectrum extends Vis {
	constructor() {
		super();
		this.name = "spectrum";

		this.draw = function () {
			push();
			let spectrum = fourier.analyze();
			noStroke();

			for (let i = 0; i < spectrum.length; i++) {

				//fade the colour of the bin from green to red
				let g = map(spectrum[i], 0, 255, 255, 0);
				fill(spectrum[i], g, 0);

				//draw each bin as a rectangle from the left of the screen
				//across
				let y = map(i, 0, spectrum.length, 0, height);
				let w = map(spectrum[i], 0, 255, 0, width);
				rect(0, y, w, height / spectrum.length);
			}
			pop();
		};
	}
}
