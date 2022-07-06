// Inspiration for beat detection comes from http://archive.gamedev.net/archive/reference/programming/features/beatdetection/
class FireWorks extends Vis {
	constructor() {
		super();
		this.name = 'fireWorks';
		this.sampleBuffer = [];
		this.fireWorks = [];

		

		this.draw = function () {
			let spectrum = fourier.analyze();
			let sum = 0;
			for (let i = 0; i < spectrum.length; i++) {
				sum += spectrum[i] * spectrum[i];
			}
			if (this.sampleBuffer.length == 60) {
				// Detect a beat.
				if (this.detectBeat(sum)) {
					this.addFireWork();
				}
				// We have to take out the oldest value with splice.
				this.sampleBuffer.splice(0, 1);
				this.sampleBuffer.push(sum);
			} else {
				this.sampleBuffer.push(sum);
			}
			this.update();
		};

		this.detectBeat = function (sum) {
			let sampleSum = 0;
			for (let i = 0; i < this.sampleBuffer.length; i++) {
				sampleSum += this.sampleBuffer[i];
			}
			let sampleAvg = sampleSum / this.sampleBuffer.length;
			// Constant to check for a value over the average.
			// Calculate the variance of the sample.
			let varianceSum = 0;
			for (let i = 0; i < this.sampleBuffer.length; i++) {
				varianceSum += this.sampleBuffer[i] - sampleAvg;
			}

			let variance = varianceSum / this.sampleBuffer.length;

			// We calculate the slope of the line using the equation of straight line y = mx + b
			// Slope between a point of 25 and 200.
			let m = -0.15 / (25 - 200);
			let b = 1 + m * 200;
			let c = m * variance + b;
			if (sum > sampleAvg * c) return true;
			return false;
		};
		this.addFireWork = function(){
			let f_colour = color(random(0, 255), random(0, 255), random(0, 255));
			let f_x = random(width * 0.2, width * 0.8);
			let f_y = random(height * 0.2, height * 0.8);
			this.fireWorks.push(new FireWork(f_colour, f_x, f_y));
		};

		this.update = function(){
			for(let i = 0; i < this.fireWorks.length; i++){
				let fireWork = this.fireWorks[i];
				fireWork.draw();
				if(fireWork.depleted)
					this.fireWorks.splice(i, 1);
			}
		}
	};
}
