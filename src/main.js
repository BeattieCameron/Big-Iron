// game configuration
let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  zoom: 1.8,
  pixelArt: true,
  scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// setting UI sizing
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let desertSpeed = 2.5;
let hillSpeed = 1;
let cliffSpeed = 0.5;
let cloudSpeed = 0.25;
let resetDistance = 180;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;
