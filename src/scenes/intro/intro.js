import 'phaser';

import Train from '/train/train'
import Player from '/player/player'
import train_image from '/train/train.png';
import magpie_image from '/player/magpie.png';

import sky_image from './sky.jpg';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({
          key: "IntroScene"
        });
    }

    preload() {
        this.load.image('sky', sky_image);
        this.load.image('magpie', magpie_image);
        this.load.image('train', train_image);
    }

    create() {
        this.sky = this.add.image(400, 300, 'sky');

        var rails = new Phaser.Curves.Path(50, 100).splineTo([ 164, 46, 274, 142, 412, 57, 522, 141, 664, 64 ]);

        this.player = new Player(this);
        this.children.add(this.player);
        this.train = new Train(rails, 0, this);
        this.children.add(this.train);
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
