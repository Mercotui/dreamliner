import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 200, 300, 'magpie');
        this.scene = scene;
        this.isControlsActive = false;

        // graphics
        this.setScale(0.1);

        // physics
        scene.physics.world.enable(this);
        this.setDrag(700, 700);
        this.body.setMaxSpeed(100);
        this.downX = 0
        this.downY = 0

        scene.input.on('pointerdown', function (pointer) {
          if (this.isControlsActive) {
            this.setDrag(0, 0);
            this.downX = pointer.x
            this.downY = pointer.y
          }
        }, this);

        scene.input.on('pointerup', function (pointer) {
          if (this.isControlsActive){
            this.setDrag(700, 700);
          }
        }, this);

        scene.input.on('pointermove', function (pointer) {
          if (this.isControlsActive && pointer.isDown) {
              this.setAcceleration(pointer.x - this.downX, pointer.y - this.downY);
          }
        }, this);
    }

    updateMovement() {
      var cursors = this.scene.input.keyboard.createCursorKeys();
      var x_acceleration = 0;
      var y_acceleration = 0;
      x_acceleration -= cursors.left.isDown ? 1000 : 0;
      x_acceleration += cursors.right.isDown ? 1000 : 0;
      y_acceleration -= cursors.up.isDown ? 1000 : 0;
      y_acceleration += cursors.down.isDown ? 1000 : 0;
      this.setAcceleration(x_acceleration, y_acceleration);

      if (this.body.velocity.x > 0) {
        this.setFlipX(true)
      } else if (this.body.velocity.x < 0){
        this.setFlipX(false)
      }
    }
}
