//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
class ControlsAndInput {
	constructor() {
		this.menuDisplayed = false;
		this.controls = [];

		// Function to add new controls
		this.add = function (control) {
			this.controls.push(control);
		};

		// Function to remove controls for new sound source
		this.remove = function (controlToRemove) {
			this.controls.filter(
				(control) => control.constructor !== controlToRemove.constructor
			);
		};

		//make the window fullscreen or revert to windowed
		this.mouseClicked = function () {
			for (let i = 0; i < this.controls.length; i++) {
				this.controls[i].hitCheck();
			}
		};

		//responds to keyboard presses
		//@param keycode the ascii code of the keypressed
		this.keyPressed = function (keycode) {
			if (keycode == 32) {
				this.menuDisplayed = !this.menuDisplayed;
			}

			if (keycode > 48 && keycode < 58) {
				let visNumber = keycode - 49;
				vis.selectVisual(vis.visuals[visNumber].name);
			}
			for (let control of this.controls) {
				if (control.constructor == MIDIKeyboard) control.keyPressed(keycode);
			}
		};

		this.keyReleased = function () {
			for (let control of this.controls) {
				if (control.constructor == MIDIKeyboard) control.keyReleased();
			}
		};

		this.mousePressed = function () {
			for (let control of this.controls) {
				if (control.constructor == EffectsPad) control.hitCheck();
			}
		};

		//draws the playback button and potentially the menu
		this.draw = function () {
			push();
			fill('white');
			stroke('black');
			strokeWeight(2);
			textSize(34);

			//Draw the controls in the this.controls array.
			for (let i = 0; i < this.controls.length; i++) {
				this.controls[i].draw();
			}
			//only draw the menu if menu displayed is set to true.
			if (this.menuDisplayed) {
				text('Select a visualisation:', 100, 30);
				this.menu();
			}
			pop();
		};

		this.menu = function () {
			//draw out menu items for each visualisation
			for (let i = 0; i < vis.visuals.length; i++) {
				let yLoc = 70 + i * 40;
				text(i + 1 + ':  ' + vis.visuals[i].name, 100, yLoc);
			}
		};
	}
}
