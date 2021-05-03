class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    //load audio
    this.load.audio('sfx_select', './assets/Revolver_Spin.wav');
    this.load.audio('sfx_hit', './assets/Hit.wav');
    this.load.audio('sfx_bullet', './assets/Gun_Shot_02.wav');
    this.load.audio('music', './assets/Western_Music.wav');
    this.load.bitmapFont('myFont', 'assets/pixelFont_0.png', 'assets/pixelFont.fnt');
    this.load.image('menu', 'assets/menu.png');
  }

  create() {
    // display score

    //show menu sprite
    this.menuSprite = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0);
    //show menu text
    this.add.bitmapText(game.config.width/2, game.config.height/2 + 15, 'myFont', 'Use arrow keys to move & (F) to fire', 17).setOrigin(0.5);
    this.add.bitmapText(game.config.width/2, game.config.height/2 + 130, 'myFont', 'Press < for Novice or > for Expert', 17).setOrigin(0.5);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        banditSpeed: 2,
        gameTimer: 75000    
      }
      this.sound.play('sfx_select');
      this.scene.start('playScene');    
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        banditSpeed: 4,
        gameTimer: 55000    
      }
      this.sound.play('sfx_select');
      this.scene.start('playScene');    
    }
  }
}