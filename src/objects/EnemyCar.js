export default class EnemyCar extends Phaser.Sprite {

	constructor({game, x, y, asset}){
		super(game, x, y, asset);
		this.game = game;
		this.scale.setTo(.20);
		this.game.physics.arcade.enable(this);
	}

	update() {
		this.position.y += 4;

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

	reset({x,y}) {
		super.reset(x,y);
	}
}
