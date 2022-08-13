class PlaylistControl extends Control {
	playlists;
	selector;
	constructor() {
		super();
		this.x = width * (3 / 4);
		this.y = 140;
		this.changeSound = false;
		this.forwardButton = {
			x: this.x + 100,
			y: this.y + 40,
			width: 15,
			height: 15,
			span: 10,
		};
		this.backwardButton = {
			x: this.x + 20,
			y: this.y + 40,
			width: 15,
			height: 15,
			span: -10,
		};
		this.playlists = [
			new Playlist('Latin Party', [
				'../../assets/playlists/latinParty/Formentera - Aitana Nicki Nicole.mp3',
				'../../assets/playlists/latinParty/Paris - Ingratax.mp3',
				'../../assets/playlists/latinParty/Te Felicito - Shakira.mp3',
			]),
			new Playlist('Alternative', [
				'../../assets/playlists/alternative/Do I Wanna Know - Arctic Monkeys.mp3',
				'../../assets/playlists/alternative/Somebody Else - The 1975.mp3',
				'../../assets/playlists/alternative/Use Somebody - Kings Of Leon.mp3',
			]),
			new Playlist('Electronic', [
				'../../assets/playlists/electronic/Ride it - Regard.mp3',
				'../../assets/playlists/electronic/Roses Imanbek Remix - SAINt JHN.mp3',
				'../../assets/playlists/electronic/The Business - Tiësto.mp3',
			]),
		];

		this.playing = false;
		this.selectedSong = 0;

		this.selector = createSelect();
		this.selector.position(this.x, this.y);
		this.selector.option('Select a playlist');
		for (let playlist of this.playlists) {
			this.selector.option(playlist.name);
		}
		this.selector.changed(() => {
			for (let playlist of this.playlists) {
				if (playlist.name === this.selector.value()) {
					sound = loadSound(playlist.songs[this.selectedSong]);
					this.playing = true;
					this.selectedSong = 0;
				}
			}
		});

		this.draw = function () {
			fill(255);
			if (!this.playing) {
				// TODO: Solve bug that when the playlist is selected in shrinks the menu text
				push();
				textSize(16);
				text(
					'...Or select your favorite playlist from below.',
					this.x - 100,
					this.y - 20
				);
				pop();
			}
			if (this.playing) {
				fill(255);
				// Forward button draw
				triangle(
					this.forwardButton.x,
					this.forwardButton.y,
					this.forwardButton.x + this.forwardButton.width,
					this.forwardButton.y + this.forwardButton.height / 2,
					this.forwardButton.x,
					this.forwardButton.y + this.forwardButton.height
				);
				triangle(
					this.forwardButton.x + this.forwardButton.span,
					this.forwardButton.y,
					this.forwardButton.x +
						this.forwardButton.span +
						this.forwardButton.width,
					this.forwardButton.y + this.forwardButton.height / 2,
					this.forwardButton.x + this.forwardButton.span,
					this.forwardButton.y + this.forwardButton.height
				);

				// Backward button draw
				triangle(
					this.backwardButton.x,
					this.backwardButton.y,
					this.backwardButton.x - this.backwardButton.width,
					this.backwardButton.y + this.backwardButton.height / 2,
					this.backwardButton.x,
					this.backwardButton.y + this.backwardButton.height
				);

				triangle(
					this.backwardButton.x + this.backwardButton.span,
					this.backwardButton.y,
					this.backwardButton.x -
						this.backwardButton.width +
						this.backwardButton.span,
					this.backwardButton.y + this.backwardButton.height / 2,
					this.backwardButton.x + this.backwardButton.span,
					this.backwardButton.y + this.backwardButton.height
				);
			}
		};
		this.hitCheck = function () {
			if (
				mouseX > this.forwardButton.x &&
				mouseX <
					this.forwardButton.x +
						this.forwardButton.width +
						this.forwardButton.span &&
				mouseY > this.forwardButton.y &&
				mouseY < this.forwardButton.y + this.forwardButton.height
			) {
				for (let playlist of this.playlists) {
					if (playlist.name === this.selector.value()) {
						this.selectedSong++;
						if (this.selectedSong > playlist.songs.length - 1)
							this.selectedSong = 0;
						sound.stop();
						sound = loadSound(playlist.songs[this.selectedSong]);
            this.changeSound = true;
					}
				}
			}
			if (
				mouseX >
					this.backwardButton.x -
						this.backwardButton.width +
						this.backwardButton.span &&
				mouseX < this.backwardButton.x &&
				mouseY > this.backwardButton.y &&
				mouseY < this.backwardButton.y + this.backwardButton.height
			) {
				for (let playlist of this.playlists) {
					if (playlist.name === this.selector.value()) {
						this.selectedSong--;
						if (this.selectedSong < 0)
							this.selectedSong = playlist.songs.length - 1;
						sound.stop();
						sound = loadSound(playlist.songs[this.selectedSong]);
            this.changeSound = true;
					}
				}
			}
		};
	}
	// Getters
	getPlayingState() {
		return this.playing;
	}

	getChangeInSound() {
		return this.changeSound;
	}
	// Setters
	setPlayingState(value) {
		this.playing = value;
	}

  setChangeInSound(value){
    this.changeSound = value;
  }
}
