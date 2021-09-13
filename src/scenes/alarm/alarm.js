import 'phaser';

import Train from '/train/train'
import Player from '/player/player'

import alarm_image from './alarm.jpg';

export default class AlarmScene extends Phaser.Scene {
    constructor() {
        super({
          key: "AlarmScene"
        });
    }

    preload() {
        this.load.image('alarm_background', alarm_image);
    }

    create(data) {
        this.background = this.add.image(960, 540, 'alarm_background');

        var rails = new Phaser.Curves.Path(0, 700).splineTo([ 960, 700, 1920, 700 ]);

        this.train = new Train(rails, data.train_speed, this);
        this.children.add(this.train);
        this.train.isControlsActive = true;

        var graphics = this.add.graphics();
        graphics.lineStyle(1, 0x00ff00, 1);
        rails.draw(graphics);
    }

    update() {
        this.train.updateMovement();

        if (this.train.is_at_end) {
          this.scene.start('SpiritedScene', {train_speed: this.train.speed});
        }
    }
}
