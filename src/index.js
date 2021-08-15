import 'phaser';
import './style.css';
import test_image from './Test-Logo.svg';

class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload() {
        this.load.image('logo', test_image);
    }
    create() {
        this.foobar = this.add.image(400, 300, 'logo');
        this.foobar.setOrigin(0.5, 0.25)
    }
    update() {
        this.foobar.rotation += 0.01;
    }
}

let config = {
    width: 800,
    height: 600,
    scene: PlayGame
};

new Phaser.Game(config);
