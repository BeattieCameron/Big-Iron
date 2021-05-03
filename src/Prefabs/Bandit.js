class Bandit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y , texture, frame);
    scene.add.existing(this); // add to existing scene
    this.points = pointValue;
    this.moveSpeed = game.settings.banditSpeed;
    this.intitialDestinationX = Phaser.Math.Between(50, 580);
    this.intitialDestinationY = Phaser.Math.Between(325, 160);
    this.destinationX = this.intitialDestinationX;
    this.destinationY = this.intitialDestinationY;
  }

  update() {

    if((this.x > this.destinationX - 5 && this.x < this.destinationX + 5) && (this.y > this.destinationY - 5 && this.y < this.destinationY + 5))
    {
      this.destinationX = Phaser.Math.Between(this.intitialDestinationX - 50, this.intitialDestinationX + 50);
      this.destinationY = Phaser.Math.Between(this.intitialDestinationY - 50, this.intitialDestinationY + 50);
      this.moveSpeed = 0.5
    } else if (this.x > this.destinationX)
    {
      this.x -= this.moveSpeed;
    } else if (this.x < this.destinationX)
    {
      this.x += this.moveSpeed;
    }

    if(this.y > this.destinationY - 5 && this.y < this.destinationY + 5)
    {
    } else if (this.y > this.destinationY)
    {
      this.y -= this.moveSpeed;
    } else if (this.y < this.destinationY)
    {
      this.y += this.moveSpeed;
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
    this.x = 0;
    this.y = Phaser.Math.Between(275, 200);
    this.moveSpeed = game.settings.banditSpeed
    this.intitialDestinationX = Phaser.Math.Between(50, 580);
    this.intitialDestinationY = Phaser.Math.Between(325, 160);
    this.destinationX = this.intitialDestinationX;
    this.destinationY = this.intitialDestinationY;
  }
}