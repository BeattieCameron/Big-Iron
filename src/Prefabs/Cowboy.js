// Cowboy (player) prefab
class Cowboy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    //add object to the existing scene
    scene.add.existing(this);
    this.isFiring = false;
    this.moveSpeed = 2;
    this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
  }

  update() {
    // left/right movement
    if(!this.isFiring) {
      if(keyLEFT.isDown && this.x >= 13) {
        this.x -= this.moveSpeed;
      } else if (keyRIGHT.isDown && this.x <= game.config.width - 13){
        this.x += this.moveSpeed;
      }
    }
    
    /*
    //fire button
    if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
      this.isFiring = true;
      this.sfxRocket.play(); //play sfx
    }
    //if fired, move the rocket up
    if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
      this.y -= this.moveSpeed;
    }
    //reset on miss
    if(this.y <= borderUISize * 3 + borderPadding) {
      this.reset();
    }
    */
  }
  

  //reset rocket to ground
  reset() {
    this.isFiring = false;
    this.y = 355;
  }
}