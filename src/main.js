/*
Name: Jackie Huang
Title: Sumo Slammers
*/

let config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    // scale: {
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            debug: false,
        }
    },
    scene: [Load, Menu, Play, GameOver]
}

//global variables----------------------------------------------

//game text config
let game = new Phaser.Game(config);

//coin iteration
let coinCount = 0

let scoreConfig;
let highScore = 0;

//reserve keyboard vars
let keySPACE, keyRIGHT, keyLEFT, keyR;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

