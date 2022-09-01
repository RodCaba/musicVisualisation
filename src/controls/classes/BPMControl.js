class BPMControl extends Control {
	constructor() {
		super();
		this.x = width * (3 / 4);
		this.y = 400;
		// Create a GUI with the global params of BPM
		this.gui = createGui('BPM').setPosition(this.x, this.y);
		this.gui.addObject(bpmParams);
		this.draw = function () {
			let fs = fullscreen();
			if (fs) this.gui.hide();
			else this.gui.show();
		};
		this.hitCheck = function () {
			sound.rate(bpmParams.playBackRate);
		};
	}
}
