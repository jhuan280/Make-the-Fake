/*
Name: Jackie Huang
Title: Sumo Slammers


*/

// let config = {
//     type: Phaser.AUTO,
//     width: 80 * 16,
//     height: 60 * 16,
//     scale: {
//         autoCenter: Phaser.Scale.CENTER_BOTH
//     },
//     render: {
//         pixelArt: true
//     },
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false,
//         }
//     },
//     scene: [Menu, Play, Load]
// }

let config = {
    type: Phaser.AUTO,
    width: 80 * 16,
    height: 60 * 16,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
        }
    },
    scene: [Menu, Play, Load]
}


let game = new Phaser.Game(config);
let scoreConfig;
let highScore = 0;
// let timer;

//reserve keyboard vars
let keySPACE, keyRIGHT, keyLEFT, keyR;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;