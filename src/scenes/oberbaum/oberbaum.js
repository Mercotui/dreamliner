import 'phaser';

import Train from '/train/train'
import Player from '/player/player'

import oberbaum_back_image from './oberbaum_back.jpg';
import oberbaum_front_image from './oberbaum_front.png';

export default class OberbaumScene extends Phaser.Scene {
    constructor() {
        super({
          key: "OberbaumScene"
        });
    }

    preload() {
        this.load.image('oberbaum_background', oberbaum_back_image);
        this.load.image('oberbaum_foreground', oberbaum_front_image);
    }

    create(data) {
        this.background = this.add.image(960, 540, 'oberbaum_background');

        var rails = new Phaser.Curves.Path(0, 450).splineTo([ 1100, 440]);

        this.train = new Train('u2_train', rails, data.train_speed, this);
        this.children.add(this.train);
        this.train.setScale(0.2);
        this.train.isControlsActive = true;

        this.foreground = this.add.image(960, 540, 'oberbaum_foreground');

        // var graphics = this.add.graphics();
        // graphics.lineStyle(1, 0x00ff00, 1);
        // rails.draw(graphics);
    }

    update() {
        this.train.updateMovement();

        if (this.train.is_at_end) {
          this.scene.start('SpaceScene', {train_speed: this.train.speed});
        }
    }
}
