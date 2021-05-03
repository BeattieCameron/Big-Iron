// Bullet (player) prefab
class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    //add object to the existing scene
    scene.add.existing(this);
    this.isFiring = false;
    this.moveSpeed = 2;
    this.shotSpeed = 6;
    this.storedX = this.x;
    this.sfxBullet = scene.sound.add('sfx_bullet'); // add rocket sfx
    this.coolDown = 120;
  }

  update() {
    // left/right movement
    if(!this.isFiring) {
      if(keyLEFT.isDown && this.x >= 13) {
        this.x -= this.moveSpeed;
      } else if (keyRIGHT.isDown && this.x <= game.config.width - 13) {
        this.x += this.moveSpeed;
      }
      this.storedX = this.x;
    } else {
      if(keyLEFT.isDown && this.x >= 13) {
        this.storedX -= this.moveSpeed;
      } else if (keyRIGHT.isDown && this.x <= game.config.width - 13) {
        this.storedX += this.moveSpeed;
      }
    }

    if(this.coolDown > 0)
    {
      this.coolDown--;
    }
    
    //fire button
    if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring && (this.coolDown <= 0)) {
      this.isFiring = true;
      this.y = 355;
      this.sfxBullet.play(); //play sfx
      this.coolDown = 120;
    }
    //if fired, move the bullet up
    if(this.isFiring && this.y >= resetDistance) {
      this.y -= this.shotSpeed;
    }
    //reset on miss
    if(this.y <= resetDistance) {
      this.reset();
    }
  }

  //reset bullet to offscreen
  reset() {
    this.isFiring = false;
    this.y = 490;
    this.x = this.storedX;
  }
}