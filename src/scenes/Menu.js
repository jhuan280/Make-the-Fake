class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Sumo Slammers', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press SPACEBAR to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3, 'Press SPACEBAR to jump', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#000';
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.select = this.sound.add('select', {volume: 0.2})
    }

    

    update(){
        //start the game
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.select.play()
            this.scene.start('playScene')

        }
    }

}