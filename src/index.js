import 'phaser';
import 'screenfull';

import '/style.css';
import IntroScene from '/scenes/intro/intro'
import SpiritedScene from '/scenes/spirited/spirited'
import AlarmScene from '/scenes/alarm/alarm'

let config = {
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    antialias: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [IntroScene, SpiritedScene, AlarmScene]
};

new Phaser.Game(config);
