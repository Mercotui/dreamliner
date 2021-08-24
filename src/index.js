import 'phaser';
import './style.css';
import test_image from './Test-Logo.svg';
import sky_image from './sky.jpg';
import magpie_image from './magpie.png';
import train_image from './train.png';

class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.image('logo', test_image);
        this.load.image('sky', sky_image);
        this.load.image('magpie', magpie_image);
        this.load.image('train', train_image);
    }

    create() {
        this.sky = this.add.image(400, 300, 'sky');

        this.player = this.physics.add.sprite(200, 300, 'magpie');
        this.player.setScale(0.1);
        this.player.setDrag(700, 700);
        this.player.body.setMaxSpeed(100);

        // train stuff
        var rails = new Phaser.Curves.Path(50, 100).splineTo([ 164, 46, 274, 142, 412, 57, 522, 141, 664, 64 ]);

        var train = this.add.follower(rails, 0, 0, 'train');
        train.setScale(0.15);

        train.startFollow({
            positionOnPath: true,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
    }

    update() {
        var cursors = this.input.keyboard.createCursorKeys();
        var x_acceleration = 0;
        var y_acceleration = 0;
        x_acceleration -= cursors.left.isDown ? 1000 : 0;
        x_acceleration += cursors.right.isDown ? 1000 : 0;
        y_acceleration -= cursors.up.isDown ? 1000 : 0;
        y_acceleration += cursors.down.isDown ? 1000 : 0;
        this.player.setAcceleration(x_acceleration, y_acceleration);

        if (this.player.body.velocity.x > 0) {
          this.player.setFlipX(true)
        } else if (this.player.body.velocity.x < 0){
          this.player.setFlipX(false)
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
