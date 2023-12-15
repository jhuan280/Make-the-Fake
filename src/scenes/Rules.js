class Rules extends Phaser.Scene{
    constructor(){
        super("ruleScene");
    }

    create(){
        //credit config
        let creditConfig = {
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

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

        let credit = this.add.text(this.game.config.width / 2, this.game.config.height/3, 
        'Rules: Your main objective is to unlock the requiremets to pass through the red torii gate at the top of the map\n\n Collect at least 50 coins and 4 omnitrixs in order to pass\n\n You get 90 seconds in order to reach the goal',{
            fontFamily: 'Times New Roman',
            fontSize: '18px',
            color: '#000000',
            backgroundColor: '#FFFFFF',
        }).setOrigin(0.5)
        
        this.select = this.sound.add('select', {volume: 0.2})
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT) 
        this.add.text(game.config.width/2, game.config.height/1.5, 'Press "<-" to go back to the menu', creditConfig).setOrigin(0.5);
    }


    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.select.play()
            this.scene.start('menuScene')

        }
        
    }

}