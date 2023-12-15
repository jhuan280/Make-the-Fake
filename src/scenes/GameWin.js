class GameWin extends Phaser.Scene{
    constructor(){
        super("winScene");
    }

    create(){
        //display score
        let menuConfig = {
            fontFamily: 'Courier New',
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

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'You Win!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'You successfully escaped the world of Sumo Slammers!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press (Left Arrow) to return to menu', menuConfig).setOrigin(0.5);
        
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // this.select = this.sound.add('select', {volume: 0.2})
    }


    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            // this.select.play()
            this.scene.start('menuScene')

        }
        
    }

}