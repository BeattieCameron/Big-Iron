class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    //load audio
    this.load.audio('sfx_select', './assets/Revolver_Spin.wav');
    this.load.audio('sfx_explosion', './assets/Hit.wav');
    this.load.audio('sfx_rocket', './assets/Gun_Shot.wav');
    this.load.audio('music', './assets/Western_Music.wav');
    this.load.bitmapFont('myFont', 'assets/pixelFont_0.png', 'assets/pixelFont.fnt');
    this.load.image('menu', 'assets/menu.png');
  }

  create() {
    // display score
    let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }

    //show menu sprite
    this.menuSprite = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0);
    //show menu text
    this.add.bitmapText(game.config.width/2, game.config.height/2 + 15, 'myFont', 'Use arrow keys to move & (F) to fire', 17).setOrigin(0.5);
    this.add.bitmapText(game.config.width/2, game.config.height/2 + 130, 'myFont', 'Press < for Novice or > for Expert', 17).setOrigin(0.5);
    //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

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
        gameTimer: 75000    
      }
      this.sound.play('sfx_select');
      this.scene.start('playScene');    
    }
  }
}