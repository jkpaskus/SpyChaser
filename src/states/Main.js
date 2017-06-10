import ExampleObject from 'objects/ExampleObject';

class Main extends Phaser.State {

	create() {

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the games background colour
		this.game.stage.backgroundColor = '#cecece';

		var phaser = this.game.add.sprite(80, 0, 'phaser');

		//Example of including an object
		//let exampleObject = new ExampleObject(this.game);
	}

	update() {

	}

}

export default Main;
