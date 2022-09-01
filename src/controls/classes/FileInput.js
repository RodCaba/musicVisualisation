class FileInput extends Control {
	constructor() {
		super();
		this.x = width * (3 / 4);
		this.y = 70;
		this.textLength = 50;
		// Initial state of the control
		this.text = 'Load a song to start!';
		this.playing = false;

		this.input = createFileInput((file) => {
			if (file.type === 'audio') {
				this.handleFile(file, this);
			} else {
				alert('File not supported :(');
			}
		});
		this.input.position(this.x, this.y);

		this.handleFile = function (file, self) {
			if (file.type === 'audio') {
				sound = loadSound(
					file,
					function success() {
						self.changeText(`Now playing: ${file.name}`);
						self.playing = true;
					},
					function fail() {
						alert('File not supported :(');
					},
					function whileLoading(loaded) {
						console.log(loaded);
						self.changeText('Loading...');
					}
				);
			}
		};

		this.draw = function () {
			let fs = fullscreen();
			if (fs) {
				this.input.hide();
				return;
			} else {
				this.input.show();
			}
			push();
			fill(255);
			textSize(16);
			text(this.text, this.x - 100, this.y - 20);
			pop();
		};
		// As we don't need a hitcheck function, we just return.
		this.hitCheck = function () {
			return;
		};
		this.changeText = function (string) {
			if (string.length > this.textLength)
				this.text = string.slice(0, this.textLength) + '...';
			else this.text = string;
		};
	}
	// Getters

	getPlayingState() {
		return this.playing;
	}
	//Setters
	setPlayingState(value) {
		this.playing = value;
	}

	setFileInputText(string) {
		if (this.playing) return;
		try {
			let strings = string.split('/');
			let songString = strings[strings.length - 1];
			let splitExtension = songString.split('.mp3');
			let songName = splitExtension[0];
			this.changeText(`Now playing: ${songName}`);
		} catch (e) {
			console.log(e);
		}
	}
}
