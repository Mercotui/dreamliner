import 'phaser';

import Train from '/train/train'
import Player from '/player/player'
import czech_train_image from '/train/train.png';
import u2_train_image from '/train/u2.jpg';
import magpie_image from '/player/magpie.png';

import intro_image from './intro.jpg';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({
          key: "IntroScene"
        });
    }

    preload() {
        this.load.image('intro', intro_image);
        this.load.image('magpie', magpie_image);
        this.load.image('train', czech_train_image);
        this.load.image('u2_train', u2_train_image);
    }

    create() {
        this.sky = this.add.image(960, 540, 'intro');

        var rails = new Phaser.Curves.Path(-500, 820).splineTo([ 1920, 820]);

        this.player = new Player(this);
        this.children.add(this.player);
        this.train = new Train('u2_train', rails, 0, this);
        this.children.add(this.train);
        this.train.setScale(0.5);
        this.train.traveled_distance = 600;
        this.train.isControlsActive = true;

        // var graphics = this.add.graphics();
        // graphics.lineStyle(1, 0x00ff00, 1);
        // rails.draw(graphics);
    }

    update() {
        if (this.player.isControlsActive){
          this.player.updateMovement();
        } else if (this.train.isControlsActive) {
          this.train.updateMovement();
        }

        if (this.train.is_at_end) {
          this.scene.start('SpiritedScene', {train_speed: this.train.speed});
        }
    }
}
