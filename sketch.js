//global for the controls and input
let controls = null;
//store visualisations in a container
let vis = null;
//variable for the p5 sound object
let sound = null;
//variable for p5 fast fourier transform
let fourier;

// Add GUI for BPM control
let bpmParams = {
	//set PlayBack Rate
	playBackRate: 1.0,
	playBackRateMin: 0.95,
	playBackRateMax: 1.05,
	playBackRateStep: 0.01
}


function preload() {
	sound = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	
	controls = new ControlsAndInput();
	controls.add(new PlaybackButton());
	controls.add(new FileInput());
	controls.add(new FullscreenButton());
	controls.add(new BPMControl());
	controls.add(new PlaylistControl());

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	vis.add(new RidgePlots());
	vis.add(new NoiseLines());
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked() {
	controls.mousePressed();
}

function keyPressed() {
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
