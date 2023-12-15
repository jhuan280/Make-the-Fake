/*
Name: Jackie Huang
Title: Sumo Slammers

Technical Execution:
    - Physics System (Gravity, player movement, enemy movement)
    - Cameras (Camera following player)
    - Text Object (Menu text, rules text, credits text, score text, timer text)
    - Animation Manager (Player animation, enemy animation)
    - Timers (Attack cool-down timer, timer until player dies)
    - Tilemaps (main map was constructed using tile maps, tilemap having 3 layers: terrain, background, collectables)
*/

let config = {
    // parent: 'phaser-game',
    type: Phaser.AUTO,
    // width: 80 * 16,
    width: 1280,
    // height: 60 * 16,
    height: 960,
    backgroundColor: 'FAD6A5',
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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
    scene: [Load, Menu, Credits, Rules, Play, GameOver, GameWin]
}

//global variables----------------------------------------------

//game text config
let game = new Phaser.Game(config);

//time
let timer;

//centering
let height = game.config
let width = game.config
let centerX = game.config.width/2

//coin iteration
let coinCount = 0
let omnitrixCount = 0

let scoreConfig;
let highScore = 0;

//reserve keyboard vars
let keySPACE, keyRIGHT, keyLEFT, keyR;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

