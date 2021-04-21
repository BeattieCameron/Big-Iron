class Bandit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y , texture, frame);
    scene.add.existing(this); // add to existing scene
    this.points = pointValue;
    this.moveSpeed = game.settings.banditSpeed;
    this.destinationX = Phaser.Math.Between(20, 620);
    this.destinationY = 0;
  }

  update() {

    if(this.x > this.destinationX - 5 && this.x < this.destinationX + 5)
    {
      this.destinationX = Phaser.Math.Between(20, 620);
    } else if (this.x > this.destinationX)
    {
      this.x -= this.moveSpeed;
    } else if (this.x < this.destinationX)
    {
      this.x += this.moveSpeed;
    }

    // move spaceship left
    //this.x -= this.moveSpeed;
    //wrap around from left to right edge
    if(this.x <= 0 - this.width) {
      this.reset();
    }
  }

  //reset spaceship to the right side of the screen
  reset() {
    this.x = game.config.width;
  }
}