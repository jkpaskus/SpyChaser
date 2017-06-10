import ExampleObject from 'objects/ExampleObject';

class Main extends Phaser.State {

	create() {

		this.ACCELERATION = 200;
		this.DRAG = 50;


		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the games background colour
		this.game.stage.backgroundColor = '#cecece';
		this.cursors = this.game.input.keyboard.createCursorKeys();


		this.road = this.game.add.tileSprite(this.game.world.centerX / 2,
        this.game.height - this.game.cache.getImage('road').height,
        this.game.width / 2,
        this.game.cache.getImage('road').height, 'road' );

		this.spycar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + (this.game.world.centerY / 2), 'spycar');
		this.spycar.anchor.setTo(0.5, 0.5);
  	this.game.physics.arcade.enable(this.spycar);
		this.spycar.body.drag.setTo(this.DRAG, this.DRAG);
		//Example of including an object
		//let exampleObject = new ExampleObject(this.game);
	}

	update() {

		this.road.tilePosition.y += 5;

		if (this.cursors.up.isDown)
	  {
	    this.spycar.body.acceleration.y = -this.ACCELERATION;
	  }
	  if (this.cursors.down.isDown)
	  {
	    this.spycar.body.acceleration.y = this.ACCELERATION;
	  }
	  if (this.cursors.left.isDown)
	  {
	    this.spycar.body.acceleration.x = -this.ACCELERATION;
	  }
	  if (this.cursors.right.isDown)
	  {
	    this.spycar.body.acceleration.x = this.ACCELERATION;
	  }

	}

}

export default Main;
