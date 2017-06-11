// import ExampleObject from 'objects/ExampleObject';
import RoadLine from 'objects/RoadLine';
import EnemyCar from 'objects/EnemyCar';

class Main extends Phaser.State {

	create() {

		this.ACCELERATION = 200;
		this.DRAG = 50;

		this.lineCreate = false;

		this.rect = this.game.add.bitmapData(20,40);
		this.rect.ctx.beginPath();
		this.rect.ctx.rect(0,0,20,40);
		this.rect.ctx.fillStyle = '#fad201';
		this.rect.ctx.fill();

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the games background colour
		this.game.stage.backgroundColor = '#cecece';
		this.cursors = this.game.input.keyboard.createCursorKeys();


		this.road = this.game.add.tileSprite(this.game.world.centerX / 2,
        this.game.height - this.game.cache.getImage('road').height,
        this.game.cache.getImage('road').width,
        this.game.cache.getImage('road').height, 'road' );

		this.lines = this.game.add.group();
		this.game.time.events.loop(Phaser.Timer.SECOND * .5, function() {
			this.lineCreate = true;
			this.spycar.bringToTop();
		}, this);

		this.enemies = this.game.add.group();
		this.game.time.events.loop(Phaser.Timer.SECOND * 2, function() {
			let posRandMod = this.game.rnd.integerInRange(-200, 200)
			this.createEnemy({game: this.game, x: this.game.world.centerX + posRandMod, y: -10, asset: 'redcar'});
		}, this);

		this.spycar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + (this.game.world.centerY / 2), 'spycar');
		this.spycar.frameName = 'spycar-default.png';

		this.spycar.anchor.setTo(0.5);
  	this.game.physics.arcade.enable(this.spycar);
		this.spycar.body.drag.setTo(this.DRAG, this.DRAG);
		//Example of including an object
		//let exampleObject = new ExampleObject(this.game

		//Keep spycar on the screen.
		this.spycar.checkWorldBounds = true;
		this.spycar.body.collideWorldBounds = true;

		this.keyOne = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.keyTwo = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.keyThree = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		this.keyFour = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		this.keyFive = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
	}

	update() {

		if (this.keyOne.isDown) {
			this.spycar.frameName = 'spycar-default.png';
		}

		if (this.keyTwo.isDown) {
			this.spycar.frameName = 'spycar-front-guns.png';
		}

		if (this.keyThree.isDown) {
			this.spycar.frameName = 'spycar-spiketires.png';
		}

		if (this.keyFour.isDown) {
			this.spycar.frameName = 'spycar-side-missiles.png';
		}

		if (this.keyFive.isDown) {
			this.spycar.frameName = 'spycar-flying.png';
		}

		this.road.tilePosition.y += 5;

		this.spycar.body.acceleration.x = 0;
  	this.spycar.body.acceleration.y = 0;

		if (this.lineCreate) {
			this.createLine({game: this.game, x: this.game.world.centerX, y: -10, rect: this.rect});
			this.lineCreate = false;
		}

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

	createLine(data) {
		let line = this.lines.getFirstExists(false);

        if (!line) {
            line = new RoadLine(data);
            this.lines.add(line);
        }
        line.reset(data);
	}

	createEnemy(data) {
		let enemy = this.enemies.getFirstExists(false);

			if(!enemy) {
				enemy = new EnemyCar(data);
				this.enemies.add(enemy);
			}
			enemy.reset(data);
	}
}

export default Main;
