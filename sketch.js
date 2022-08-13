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
	playBackRateStep: 0.01,
};

// Global variables for communication between controls
let playBackButton;
let playlistControl;
let fileInput;

function preload() {
	sound = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	// Change frame rate for firework visualisation.
	frameRate(60);
	angleMode('DEGREES');

	controls = new ControlsAndInput();

	playBackButton = new PlaybackButton();
	playlistControl = new PlaylistControl();
	fileInput = new FileInput();
	effectsPad = new EffectsPad(sound);

	controls.add(playBackButton);
	controls.add(fileInput);
	controls.add(new FullscreenButton());
	controls.add(new BPMControl());
	controls.add(playlistControl);
	controls.add(new MIDIKeyboard());
	controls.add(effectsPad);

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	vis.add(new RidgePlots());
	vis.add(new NoiseLines());
	vis.add(new FireWorks());
	vis.add(new Circle());
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();

	playBackButton.setPlayingState(sound.isLooping());

	let playListPlaying = playlistControl.getPlayingState();
	let fileInputPlaying = fileInput.getPlayingState();

	if (playListPlaying) {
		fileInput.setPlayingState(false);
		fileInput.setFileInputText(sound.file);
		if(effectsPad.getChangesInSoundFile() == 0){
			effectsPad.setEffectsSound(sound);
			effectsPad.setChangesInSoundFile(1);
		}
		if(playlistControl.getChangeInSound()){
			effectsPad.setEffectsSound(sound);
			playlistControl.setChangeInSound(false);
		}
	}
	if (fileInputPlaying) {
		playlistControl.setPlayingState(false);
		effectsPad.setEffectsSound(sound)
	}
}

function mouseClicked() {
	controls.mouseClicked();
}

function keyPressed() {
	controls.keyPressed(keyCode);
}

function keyReleased() {
	controls.keyReleased();
}

function mousePressed() {
	controls.mousePressed();
}
//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
