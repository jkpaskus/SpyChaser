export default class EnemyCar extends Phaser.Sprite {

	constructor({game, x, y, asset, frame}){
		super(game, x, y, asset);
		this.game = game;
		this.scale.setTo(.20);
		this.game.physics.arcade.enable(this);
		this.body.bounce.setTo(1.25, 1.25);
		this.frame = frame;
	}

	update() {
		this.body.acceleration.y = 35;

		// this.game.physics.arcade.collide(this, this.game.state.states.Main.spycar, this.carCollision, null, this);

		if (this.position.x > this.game.state.states.Main.spycar.position.x) {
			this.body.acceleration.x = -50
		}
		else if (this.position.x < this.game.state.states.Main.spycar.position.x) {
			this.body.acceleration.x = 50
		}

		if(this.position.y > this.game.camera.view.bottom) {
			this.kill();
		}
	}

	// carCollision(car1, car2) {
	// 	let timer1 = this.game.time.events.add(Phaser.Timer.SECOND * .50, car1.kill, this);
	// 	let timer2 = this.game.time.events.add(Phaser.Timer.SECOND * .50, car2.kill, this);
	// }

	reset({x,y}) {
		super.reset(x,y);
	}
}
