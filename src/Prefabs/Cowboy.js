// Cowboy (player) prefab
class Cowboy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    //add object to the existing scene
    scene.add.existing(this);
    this.isFiring = false;
    this.moveSpeed = 2;
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
    
  }
  

  //reset rocket to ground
  reset() {
    this.isFiring = false;
    this.y = 355;
  }
}