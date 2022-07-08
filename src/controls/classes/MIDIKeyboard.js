class MIDIKeyboard extends Control {
	constructor() {
		super();
		let osc = new p5.TriOsc();
		let notes = 
			{
				65: {
					noteNumber: 60,
					key: 'C4',
					keyBoard: 'A',
				},
				83: {
					noteNumber: 62,
					key: 'D4',
					keyBoard: 'S',
				},
				68: {
					noteNumber: 64,
					key: 'E4',
					keyBoard: 'D',
				},
				70: {
					noteNumber: 65,
					key: 'F4',
					keyBoard: 'F',
				},
				71: {
					noteNumber: 67,
					key: 'G4',
					keyBoard: 'G',
				},
				72: {
					noteNumber: 69,
					key: 'A4',
					keyBoard: 'H',
				},
				74: {
					noteNumber: 71,
					key: 'B4',
					keyBoard: 'J',
				},
				75: {
					noteNumber: 72,
					key: 'C5',
					keyBoard: 'K',
				},
				76: {
					noteNumber: 74,
					key: 'D5',
					keyBoard: 'L',
				},
      }
    this.playing = false;
    this.selectedNote = null;
		
		// Start silent
		osc.start();
		osc.amp(0);

		this.draw = function () {
			if(!this.playing) return;
      if(!this.selectedNote) return;
      let x = map(this.selectedNote.noteNumber, 60, 74, 0, width);
			let y = height - 40
			push();
      fill(255, 255, 0);
      ellipse(x+5, height-40, 60);
			let keyBubble = new KeyBubble(this.selectedNote.key, x-5, y);
			keyBubble.draw();
			pop();
		};

		this.hitCheck = function () {
			return;
		};

		this.keyPressed = function (keycode) {
			let note = this.mapKeycodeToNote(keycode);
      if(!note) return;
      this.playing = true;
			osc.freq(midiToFreq(note.noteNumber));
			osc.amp(0.5);
		};

		this.keyReleased = function () {
			osc.amp(0);
      this.playing = false;
		};

    this.mapKeycodeToNote = function(keycode){
      let note = notes[keycode];
      this.selectedNote = note;
      return note;
    }
	}
}
