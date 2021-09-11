import 'phaser';
var _ = require('lodash');

export default class Train extends Phaser.GameObjects.Sprite {
    ACCELERATION = 0.1;
    DECELERATION = 0.5;
    SPEED_MAX = 50;

    constructor(rails, scene) {
        super(scene, 100, 200, 'train');

        this.setScale(0.15);

        scene.physics.world.enable(this);

        this.isControlsActive = false;
        this.rails = rails;
        this.traveled_distance = 0
        this.is_at_end = false
        this.is_at_start = true
        this.speed = 0

        this.setPositionOnRail(this.traveled_distance);
    }

    setPositionOnRail(traveled_distance) {
      var normalized_traveled_distance = traveled_distance / this.rails.getLength();
      normalized_traveled_distance = _.clamp(normalized_traveled_distance, 0, 1);

      // get position
      var position = this.rails.getPoint(normalized_traveled_distance);
      this.setPosition(position.x, position.y);

      // calculate rotation
      var tangent_vector = this.rails.getTangent(normalized_traveled_distance);
      var tangent_angle = Math.atan2(tangent_vector.y, tangent_vector.x) * 180 / Math.PI;
      this.setAngle(tangent_angle);

      // update visibility
      this.is_at_end = normalized_traveled_distance == 1
      this.is_at_start = normalized_traveled_distance == 0
      this.setVisible(!(this.is_at_end || this.is_at_start));
    }

    updateMovement() {
      var cursors = this.scene.input.keyboard.createCursorKeys();
      var acceleration = 0;
      acceleration += cursors.up.isDown ? this.ACCELERATION : 0;
      acceleration -= cursors.down.isDown ? this.DECELERATION : 0;
      this.speed = _.clamp(this.speed + acceleration, 0, this.SPEED_MAX);
      this.traveled_distance = this.traveled_distance + this.speed;
      this.setPositionOnRail(this.traveled_distance);
    }
}
