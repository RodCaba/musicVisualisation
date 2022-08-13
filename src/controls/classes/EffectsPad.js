class EffectsPad extends Control {
	constructor(sound) {
		super();
		this.x = width * (2 / 3);
		this.y = 220;
		this.width = 350;
		this.height = 130;
		this.sound = sound;
		this.changesInSoundFile = 0;

		this.effects = [
			new Effect(
				'Delay',
				color(0, 255, 0),
				color(0, 39, 0),
				new p5.Delay(),
				[sound, 0.12, 0.7, 2300],
				[sound, 0, 0, 0]
			),
			new Effect(
				'Reverb',
				color(255, 215, 0),
				color(255, 0, 0),
				new p5.Reverb(),
				[sound],
				[sound, 0, 0]
			),
		];

		this.effectProperties = [
			{
				name: 'Delay',
				color: color(0, 255, 0),
				secondaryColor: color(0, 39, 0),
				effect: new p5.Delay(),
				processParams: [0.12, 0.7, 2300],
				unProcessParams: [0, 0, 0],
			},
			{
				name: 'Reverb',
				color: color(255, 215, 0),
				secondaryColor: color(255, 0, 0),
				effect: new p5.Reverb(),
				processParams: [],
				unProcessParams: [0, 0],
			},
		];

		this.effectsPadProperties = {
			number: this.effects.length,
			paddingX: 40 + 20 * this.effects.length,
			initialX: this.x + 20,
			initialY: this.y + 20,
			width: this.width / this.effects.length - (40 + 20 * this.effects.length),
		};

		this.draw = function () {
			push();
			fill(125, 125, 125);
			rect(this.x, this.y, this.width, this.height);
			// We calculate the amount of space in the rectangle that must be left blank for the number of pads
			for (let i = 0; i < this.effects.length; i++) {
				if (this.effects[i].pressedState) {
					fill(this.effects[i].color);
				} else fill(255);
				let effectX =
					this.effectsPadProperties.initialX +
					(this.effectsPadProperties.width + 20) * i;
				rect(
					effectX,
					this.effectsPadProperties.initialY,
					this.effectsPadProperties.width,
					this.effectsPadProperties.width
				);
				if (this.effects[i].pressedState) fill(this.effects[i].secondaryColor);
				else fill(0);
				textSize(16);
				text(this.effects[i].name, effectX + 20, this.effectsPadProperties.initialY+50);
			}
			pop();
		};

		this.hitCheck = function () {
			for (let i = 0; i < this.effects.length; i++) {
				let effectX =
					this.effectsPadProperties.initialX +
					(this.effectsPadProperties.width + 20) * i;
				if (
					mouseX > effectX &&
					mouseX < effectX + this.effectsPadProperties.width &&
					mouseY > this.effectsPadProperties.initialY &&
					mouseY <
						this.effectsPadProperties.initialY + this.effectsPadProperties.width
				) {
					this.effects[i].onPressed();
				}
			}
		};

		this.increaseChangesInSoundFile = function () {
			this.changesInSoundFile += 1;
		};
	}
	setEffectsSound(value) {
		// This function will crate a new effect list with the sound value that has changed.
		// TODO: Change the playlist and input file functions to be activated in the callback of loadsound
		let newEffects = [];
		for (let effectProperty of this.effectProperties) {
			let newEffect = new Effect(
				effectProperty.name,
				effectProperty.color,
				effectProperty.secondaryColor,
				effectProperty.effect,
				[value, ...effectProperty.processParams],
				[value, ...effectProperty.unProcessParams]
			);
			newEffects.push(newEffect);
		}
		this.effects = newEffects;
	}

	getChangesInSoundFile() {
		return this.changesInSoundFile;
	}

	setChangesInSoundFile(value) {
		this.changesInSoundFile = value;
	}
}
