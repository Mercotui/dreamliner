import 'phaser';

import Train from '/train/train'

import spirited_sky_image from './sky.jpg';

export default class SpiritedScene extends Phaser.Scene {
    constructor() {
        super({
        key: "SpiritedScene"
      });
    }

    preload() {
        this.load.image('spirited_sky_image', spirited_sky_image);
    }

    create(data) {
        this.sky = this.add.image(960, 540, 'spirited_sky_image');
        this.sky.setScale(0.6);

        var rails = new Phaser.Curves.Path(-100, 698).splineTo([ 2000, 695 ]);

        this.train = new Train('train', rails, data.train_speed, this);
        this.children.add(this.train);
        this.train.setScale(0.4);
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
          this.scene.start('OberbaumScene', {train_speed: this.train.speed});
        }
    }
}
