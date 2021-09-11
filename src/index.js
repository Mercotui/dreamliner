import 'phaser';
import 'screenfull';

import './style.css';
import sky_image from './sky.jpg';
import train_image from './train/train.png';
import magpie_image from './player/magpie.png';
import Train from './train/train'
import Player from './player/player'

class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
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
        this.train = new Train(rails, this);
        this.children.add(this.train);
        this.train.isControlsActive = true;
    }

    update() {
        if (this.player.isControlsActive){
          this.player.updateMovement();
        } else if (this.train.isControlsActive) {
          this.train.updateMovement();
        }
    }
}

let config = {
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: PlayGame
};

new Phaser.Game(config);
