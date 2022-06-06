//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
class ControlsAndInput {
	constructor() {

		this.menuDisplayed = false;

		//playback button displayed in the top left of the screen
		this.playbackButton = new PlaybackButton();

		// File input to be displayed

		this.fileInput = new FileInput();

		//make the window fullscreen or revert to windowed
		this.mousePressed = function () {
			if (!this.playbackButton.hitCheck()) {
				let fs = fullscreen();
				fullscreen(!fs);
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
		};

		//draws the playback button and potentially the menu
		this.draw = function () {
			push();
			fill("white");
			stroke("black");
			strokeWeight(2);
			textSize(34);

			//playback button 
			this.playbackButton.draw();
			//only draw the menu if menu displayed is set to true.
			if (this.menuDisplayed) {

				text("Select a visualisation:", 100, 30);
				this.menu();
			}
			pop();

		};

		this.menu = function () {
			//draw out menu items for each visualisation
			for (let i = 0; i < vis.visuals.length; i++) {
				let yLoc = 70 + i * 40;
				text((i + 1) + ":  " + vis.visuals[i].name, 100, yLoc);
			}
		};
	}
}


