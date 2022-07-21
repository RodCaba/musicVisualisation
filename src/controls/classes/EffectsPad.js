class EffectsPad extends Control {
	constructor() {
		super();
		this.x = width * (2 / 3);
		this.y = 200;
		this.width = 400;
		this.height = 180;

		this.effects = [
			{
				name: 'Delay',
				onColor: color(0, 255, 0),
        effectObject: new p5.Delay(),
				onPressed: function () {
					if (mouseIsPressed) {
						this.effectObject.process(sound, 0.12, 0.7, 2300);
					} else {
						this.effectObject.process(sound, 0, 0, 0);
					}
				},
			},
			{
				name: 'Reverb',
				onColor: color(0, 255, 255),
			},
		];

		this.effectsProperties = {
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
				fill(255);
				let effectX =
					this.effectsProperties.initialX +
					(this.effectsProperties.width + 20) * i;
				rect(
					effectX,
					this.effectsProperties.initialY,
					this.effectsProperties.width,
					this.effectsProperties.width
				);
			}
			pop();
		};

		this.hitCheck = function () {
			for (let i = 0; i < this.effects.length; i++) {
				let effectX =
					this.effectsProperties.initialX +
					(this.effectsProperties.width + 20) * i;
				if (
					mouseX > effectX &&
					mouseX < effectX + this.effectsProperties.width &&
					mouseY > this.effectsProperties.initialY &&
					mouseY <
						this.effectsProperties.initialY + this.effectsProperties.width
				) {
					this.effects[i].onPressed();
				}
			}
		};
	}
}
