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

        this.jump = true;
        //tile map creation
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        //layers
        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

        terrainLayer.setCollisionByProperty({
            collides: true
        })

        //player
        const {width, height} = this.scale
        this.ben = this.physics.add.sprite(width * 0.5, height * 0.5, 'ben').play('player-idle')
        this.ben.body.setSize(10,20).setOffset(25, 46)
        this.ben.body.setCollideWorldBounds(true)
        this.ben.body.setGravityY(650)

        //camera
        this.cameras.main.setZoom(1.5)
        this.cameras.main.startFollow(this.ben)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.ben, terrainLayer, ()=>{
            this.jump = true
        })

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
        const speed = 100

        //Phaser.Input.Keyboard.JustDown(keyLEFT)
        if (this.cursors.left.isDown){
            this.ben.flipX = true
            this.ben.setVelocityX(-speed)
            this.ben.play('player-walk', true)
        }
        else if (this.cursors.right.isDown){
            this.ben.flipX = false
            this.ben.setVelocityX(speed)
            this.ben.play('player-walk', true)
        }
        else{
            this.ben.setVelocityX(0)
            this.ben.play('player-idle', true)
        }

        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)


        if (spaceJustPressed && this.jump){
            this.ben.setVelocityY(-400)
            this.jump = false
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