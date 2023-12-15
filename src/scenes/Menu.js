class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create(){
        //header
        this.header = this.add.tileSprite(1280 / 2, 960 / 2, 0, 0, 'menuBackground')

        //play button
        this.playButton = this.physics.add.image(centerX, 960/2, 'playButton').setScale(5)
        this.playButton.body.setSize(35,16)
        this.playButton.setOffset(15,9)

        this.playButton.setInteractive()
        this.playButton.on('pointerdown', () =>{
            this.select.play()
            this.scene.start('playScene')
        })

        //start the game
        game.settings = {
            gameTimer: 0
        }

        //rules button
        this.howToButton = this.physics.add.image(centerX, 960/1.5, 'howToButton').setScale(5)
        this.howToButton.body.setSize(35,16)
        this.howToButton.setOffset(15,9)

        this.howToButton.setInteractive()
        this.howToButton.on('pointerdown', () =>{
            this.select.play()
            this.scene.start('ruleScene')
        })

        //credits button
        this.creditsButton = this.physics.add.image(centerX, 960/1.2, 'creditButton').setScale(5)
        this.creditsButton.body.setSize(35,16)
        this.creditsButton.setOffset(15,6)

        this.creditsButton.setInteractive()
        this.creditsButton.on('pointerdown', () =>{
            this.select.play()
            this.scene.start('creditScene')
        })

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

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.select = this.sound.add('select', {volume: 0.2})
    }

    

    update(){


    }

}