import 'phaser';

import Train from '/train/train'

import mondriaan_image from './mondriaan.jpg';

export default class MondriaanScene extends Phaser.Scene {
    constructor() {
        super({
        key: "MondriaanScene"
      });
    }

    preload() {
        this.load.image('mondriaan_image', mondriaan_image);
    }

    create(data) {
        this.piet = this.add.image(960, 540, 'mondriaan_image');

        var rails = new Phaser.Curves.Path(580, 0).splineTo([ 585, 1080]);

        this.train = new Train('u2_train', rails, data.train_speed, this);
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
          this.scene.start('AlarmScene', {train_speed: this.train.speed});
        }
    }
}
