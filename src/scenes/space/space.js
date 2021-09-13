import 'phaser';

import Train from '/train/train'

import space_earth_image from './earth.jpg';

export default class SpaceScene extends Phaser.Scene {
    constructor() {
        super({
        key: "SpaceScene"
      });
    }

    preload() {
        this.load.image('space_earth_image', space_earth_image);
    }

    create(data) {
        this.earth = this.add.image(500, 350, 'space_earth_image');
        this.earth.setScale(0.15);

        var rails = new Phaser.Curves.Path(710, 350).ellipseTo(210, 210);

        this.train = new Train('train', rails, data.train_speed, this);
        this.children.add(this.train);
        this.train.setScale(0.2);
        this.train.isControlsActive = true;

        // var graphics = this.add.graphics();
        // graphics.lineStyle(1, 0x00ff00, 1);
        // rails.draw(graphics);
    }

    update() {
        // if (this.player.isControlsActive){
        //   this.player.updateMovement();
        // } else
        if (this.train.isControlsActive) {
          this.train.updateMovement();
        }

        // if (this.train.is_at_start) {
        //   this.scene.start("IntroScene"); //, {train_speed: this.train_speed});
        // } else
        if (this.train.is_at_end) {
          this.scene.start('MondriaanScene', {train_speed: this.train.speed});
        }
    }
}
