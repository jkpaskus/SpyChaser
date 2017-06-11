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
		this.game.stage.backgroundColor = '#0B6623';
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
			let randCar = this.game.rnd.integerInRange(0, 1)
			this.createEnemy({game: this.game, x: this.game.world.centerX + posRandMod, y: -10, asset: 'enemycar', frame: randCar});
		}, this);

		this.spycar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + (this.game.world.centerY / 2), 'spycar');
		this.spycar.frameName = 'spycar-default.png';

		this.spycar.anchor.setTo(0.5);
  	this.game.physics.arcade.enable(this.spycar);
		this.spycar.body.drag.setTo(this.DRAG, this.DRAG);
		this.spycar.body.bounce.setTo(1, 1);
		//Example of including an object
		//let exampleObject = new ExampleObject(this.game

		//binds keys to change cars
		//Keep spycar on the screen.
		this.spycar.checkWorldBounds = true;
		this.spycar.body.collideWorldBounds = true;

		this.keyOne = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.keyTwo = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.keyThree = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		this.keyFour = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		this.keyFive = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
		this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.SHOT_DELAY = 1500; // milliseconds (10 bullets/second)
    this.BULLET_SPEED = 500; // pixels/second
    this.NUMBER_OF_BULLETS = 100;

		this.gun = this.spycar;

		// Create an object pool of bullets
    this.bulletPool = this.game.add.group();
    for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
        // Create each bullet and add it to the group.
        this.bullet = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + (this.game.world.centerY / 2), 'spycar');
				this.bullet.frameName = 'missile.png';
        this.bulletPool.add(this.bullet);

        // Set its pivot point to the center of the bullet
				this.bullet.anchor.setTo(0.5, 0.5);

 				// Enable physics on the bullet
        this.game.physics.enable(this.bullet, Phaser.Physics.ARCADE);

        // Set its initial state to "dead".
        this.bullet.kill();
    }
	}

	shootBullet() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    // If there aren't any bullets available then don't shoot
    if (this.bullet === null || this.bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    this.bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    this.bullet.checkWorldBounds = true;
    this.bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    this.bullet.reset(this.gun.x, this.gun.y);

    // Shoot it
    this.bullet.body.velocity.y = -(this.BULLET_SPEED);
    this.bullet.body.velocity.x = 0;
	};

	update() {

		this.game.physics.arcade.collide(this.enemies, this.enemies, this.carCollision, null, this);
		this.game.physics.arcade.collide(this.spycar, this.enemies, this.carCollision, null, this);

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

		if (this.shoot.isDown) {
			this.shootBullet();
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

	carCollision(car1, car2) {
		let timer1 = this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
			car1.kill()
		}, this);
		let timer2 = this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
			car2.kill()
		}, this);
	}
}

export default Main;
