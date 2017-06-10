export default class RoadLine extends Phaser.Sprite {

	constructor(game){
		super(game);
		this.game = game.game; //TODO: Clean this up.

		let rect = this.game.add.bitmapData(20,40);

		rect.ctx.beginPath();
		rect.ctx.rect(0,0,20,40);
		rect.ctx.fillStyle = '#fad201';
		rect.ctx.fill();

		this.line = this.game.add.sprite(this.game.world.centerX, this.game.world.Height - 10, rect);
		this.line.alpha =.5
	}

	update() {
		this.line.position.y += 5;

		if(this.line.position.y > this.game.world.bottomY) {
			this.line.kill();
		}
	}
}
