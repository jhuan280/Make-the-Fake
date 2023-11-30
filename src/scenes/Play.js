class Play extends Phaser.Scene{

    constructor(){
        super("playScene")
    }

    preload(){

        //player load
        this.load.path = './assets/'

        // this.load.spritesheet('ben', 'ben.png', {
        //     frameWidth: 16,
        //     frameHeight: 16,

        // })

        this.load.atlas('ben', 'ben.png', 'ben.json')

        //tileset load
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')
    }

    create(){

        this.createBenAnimations()

        //jumping
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Space)

        //tile map creation
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        //layers
        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

        terrainLayer.setCollisionByProperty({
            collides: true
        })

        this.matter.world.convertTilemapLayer(terrainLayer)

        //camera
        this.cameras.main.setZoom(1)

        //player
        const {width, height} = this.scale
        this.ben = this.matter.add.sprite(width * 0.5, height * 0.5, 'ben').play('player-idle').setFixedRotation()

        //player animation
        // this.anims.create({
        //     key: 'run',
        //     frameRate: 8,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('ben', {
        //         start: 0,
        //         end: 4,
        //         // first: 0
        //     })
        // });
        // this.ben.play('run')

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update()
    {
        const speed = 2

        //Phaser.Input.Keyboard.JustDown(keyLEFT)
        if (this.cursors.left.isDown){
            this.ben.setVelocityX(-speed)
        }
        else if (this.cursors.right.isDown){
            this.ben.setVelocityX(speed)
        }
        else{
            this.ben.setVelocityX(0)
        }
    }

    createBenAnimations()
    {
        this.anims.create({
            key: 'player-idle',
            frames: [{ key: 'ben', frame: 'ben 0.aseprite' }]
        })


        this.anims.create({
            key: 'player-walk',
            frameRate: 10,
            frames: this.anims.generateFrameNames('ben', {
                start: 0, 
                end: 4,
                prefix: 'ben ',
                suffix: '.aseprite'
            }),
            repeat: -1
        })

    }

}