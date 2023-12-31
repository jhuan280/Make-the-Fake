class GameOver extends Phaser.Scene{

    constructor(){
        super("gameOver")
    }

    create(){
        //display game over
        let gameOverConfig = {
            fontFamily: 'comic sans ms',
            fontSize: '30px',
            // backgroundColor: '#F3B141',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        //game over text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Game Over', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press "R" to go back to menu', gameOverConfig).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.select = this.sound.add('select', {volume: 0.2})

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.select.play()
            this.scene.start('menuScene')
        }

    }
}