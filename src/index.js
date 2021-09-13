import 'phaser';
import 'screenfull';

import '/style.css';
import IntroScene from '/scenes/intro/intro'
import SpiritedScene from '/scenes/spirited/spirited'
import OberbaumScene from '/scenes/oberbaum/oberbaum'
import AlarmScene from '/scenes/alarm/alarm'
import SpaceScene from '/scenes/space/space'
import MondriaanScene from '/scenes/mondriaan/mondriaan'

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
    scene: [IntroScene, SpiritedScene, OberbaumScene, SpaceScene, MondriaanScene, AlarmScene]
};

new Phaser.Game(config);
