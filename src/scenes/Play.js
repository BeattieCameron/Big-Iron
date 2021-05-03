class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    //load images/title sprites
    //this.load.image('cowboy', './assets/Cowboy.png');
    this.load.image('bullet', './assets/Bullet.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('desert', './assets/Desert1.png');
    this.load.image('hills', './assets/Desert2.png');
    this.load.image('cliffs', './assets/Desert3.png');
    this.load.image('sun', './assets/Sun.png');
    this.load.image('clouds', './assets/Clouds.png');
    this.load.image('gameover', './assets/GameOver.png');
    this.load.image('scoreboard', './assets/ScoreBoard.png');

    //load font
    this.load.bitmapFont('myFont', 'assets/pixelFont_0.png', 'assets/pixelFont.fnt');

    //load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', {
      frameWidth: 64,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 9
    });
    this.load.spritesheet('traincar', './assets/Train_Car_Sheet.png', {
      frameWidth: 198,
      frameHeight: 80,
      startFrame: 0,
      endFrame: 4
    });
    this.load.spritesheet('Bandit', './assets/Horse_Run_Sheet.png', {
      frameWidth: 104,
      frameHeight: 82,
      startFrame: 0,
      endFrame: 6
    });
    this.load.spritesheet('Horse', './assets/Horse_Run_Solo_Sheet.png', {
      frameWidth: 104,
      frameHeight: 82,
      startFrame: 0,
      endFrame: 6
    });
    this.load.spritesheet('Death', './assets/Rider_Death_Sheet.png', {
      frameWidth: 67,
      frameHeight: 107,
      startFrame: 0,
      endFrame: 4
    });
    this.load.spritesheet('CowboyS', './assets/Cowboy_Sheet.png', {
      frameWidth: 30,
      frameHeight: 52,
      startFrame: 0,
      endFrame: 4
    });
  }

  create() {
    this.sound.play('music');

    //create background
    this.sun = this.add.tileSprite(0, 0, 640, 200, 'sun').setOrigin(0, 0);
    this.clouds = this.add.tileSprite(0, 0, 640, 100, 'clouds').setOrigin(0, 0);
    this.cliffs = this.add.tileSprite(0, 50, 640, 200, 'cliffs').setOrigin(0, 0);
    this.hills = this.add.tileSprite(0, 100, 640, 100, 'hills').setOrigin(0, 0);
    this.desert = this.add.tileSprite(0, 200, 640, 280, 'desert').setOrigin(0, 0);

    //create the train
    this.anims.create({
      key: 'bounce',
      frames: this.anims.generateFrameNumbers('traincar', {
        start: 0,
        end: 4,
        first: 0
      }),
      frameRate: 15,
      repeat: -1
    });

    //creat bandit animation
    this.anims.create({
      key: 'banditrun',
      frames: this.anims.generateFrameNumbers('Bandit', {
        start: 0,
        end: 6,
        first: 0
      }),
      frameRate: 15,
      repeat: -1
    });

    //creat bandit death animation
    this.anims.create({
      key: 'banditdeath',
      frames: this.anims.generateFrameNumbers('Death', {
        start: 0,
        end: 4,
        first: 0
      }),
      frameRate: 15
    });

    this.anims.create({
      key: 'CowboyBounce',
      frames: this.anims.generateFrameNumbers('CowboyS', {
        start: 0,
        end: 4,
        first: 0
      }),
      frameRate: 15,
      repeat: -1
    });

    //add bandit (x3)
    this.bandit01 = new Bandit(this, 0, 200, 'banditrun', 0, 20).setOrigin(0,0);
    this.bandit02 = new Bandit(this, 0, 250, 'banditrun', 0, 20).setOrigin(0,0);
    this.bandit03 = new Bandit(this, 0, 300, 'banditrun', 0, 20).setOrigin(0,0);

    this.bandit01.anims.play('banditrun');
    this.bandit02.anims.play('banditrun');
    this.bandit03.anims.play('banditrun');

    let car1 = this.add.sprite(-100, 390, 'car1').setOrigin(0, 0);
    car1.anims.play('bounce', 30, true);

    let car2 = this.add.sprite(98, 390, 'car2').setOrigin(0, 0);
    car2.anims.play('bounce', 30, true);

    let car3 = this.add.sprite(296, 390, 'car3').setOrigin(0, 0);
    car3.anims.play('bounce', 30, true);

    let car4 = this.add.sprite(494, 390, 'car4').setOrigin(0, 0);
    car4.anims.play('bounce', 30, true);

    //add bullet (player 1)
    this.p1Bullet = new Bullet(this, game.config.width/2, 490, 'bullet').setOrigin(0.5, 0);

    //add cowboy (player 1)
    this.p1Cowboy = new Cowboy(this, game.config.width/2, 355, 'CowboyBounce').setOrigin(0.5, 0);
    this.p1Cowboy.anims.play('CowboyBounce');

    //define 
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    //animation config
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 9,
        first: 0
      }),
      frameRate: 30
    });
    

    //initialize score
    this.p1Score = 0;

    // display score
    this.scoreBoard = this.add.tileSprite(20, 20, 98, 51, 'scoreboard').setOrigin(0, 0);
    this.scoreLeft = this.add.bitmapText(69, 47, 'myFont', this.p1Score, 17).setOrigin(0.5);
    

    //GAME OVER flag
    this.gameOver = false;

    //60 second play clock
    //scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.gameover = this.add.tileSprite(0, 0, 640, 480, 'gameover').setOrigin(0, 0);
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 88, 'myFont', 'Press (R) to restart or < for Menu', 17).setOrigin(0.5);
        this.gameOver = true;
    }, null, this);
  }

  update() {
    // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }

    //check key input for menu
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
    }

    //PARALAX
    this.desert.tilePositionX += desertSpeed;
    this.hills.tilePositionX += hillSpeed;
    this.cliffs.tilePositionX += cliffSpeed;
    this.clouds.tilePositionX += cloudSpeed;

    if (!this.gameOver) {
      // update cowboy
      this.p1Cowboy.update();
      this.p1Bullet.update();

      // update bandit (x3)
      this.bandit01.update();
      this.bandit02.update();
      this.bandit03.update();
    }
    

    //check collisions
    if(this.checkCollision(this.p1Bullet, this.bandit03)) {
      this.p1Bullet.reset();
      this.p1Bullet.x = this.p1Cowboy.x;
      this.banditExplode(this.bandit03);
    }
    if(this.checkCollision(this.p1Bullet, this.bandit02)) {
      this.p1Bullet.reset();
      this.p1Bullet.x = this.p1Cowboy.x;
      this.banditExplode(this.bandit02);
    }
    if(this.checkCollision(this.p1Bullet, this.bandit01)) {
      this.p1Bullet.reset();
      this.p1Bullet.x = this.p1Cowboy.x;
      this.banditExplode(this.bandit01);
    }
  }

  checkCollision(bullet, bandit) {
    //simple AABB checking
    if(bullet.x < bandit.x + bandit.width &&
      bullet.x + bullet.width > bandit.x &&
      bullet.y < bandit.y + bandit.height &&
      bullet.height + bullet.y > bandit.y) {
        return true;
      } else {
        return false;
      }
  }

  banditExplode(bandit) {
    //Temporarily hide ship
    bandit.alpha = 0;
    //create explosion sprite at ship's location
    let boom = this.add.sprite(bandit.x, bandit.y - 45, 'Death').setOrigin(0, 0);
    boom.anims.play('banditdeath');
    boom.on('animationcomplete', () => {
      bandit.reset();
      bandit.alpha = 1;
      boom.destroy();
    });

    // score add and repaint
    this.p1Score += bandit.points;
    this.scoreLeft.text = this.p1Score;

    this.sound.play('sfx_hit');
  }
}