class Play extends Phaser.Scene{

    constructor(){
        super("playScene")
    }

    preload(){

        //player load
        this.load.path = './assets/'

        this.load.atlas('ben', 'ben.png', 'ben.json')
        this.load.atlas('enemy', 'enemy.png', 'enemy.json')

        //tileset load
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')
    }

    create(){

        //create animations
        this.createBenAnimations()
        this.createEnemyAnimations()

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
        this.ben.body.setSize(10,50).setOffset(25, 16)
        this.ben.body.setCollideWorldBounds(true)
        this.ben.body.setGravityY(650)

        this.physics.add.collider(this.ben, terrainLayer, ()=>{
            this.jump = true
        })

        //enemy
        this.enemy = new Enemy(this, 656, 768, 'enemy', 0)
        this.enemy.setVelocityX(-500)
        this.enemy.play("enemy-walk")
        // this.enemy.body.setCollideWorldBounds(true)
        this.enemy.body.setSize(30,50).setOffset(15, 16)

        //camera
        this.cameras.main.setZoom(1.5)
        this.cameras.main.startFollow(this.ben)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        // this.physics.add.collider(this.ben, terrainLayer, ()=>{
        //     this.jump = true
        // })


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

        this.enemy.update()

    }

    //player animations
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

    //enemy animations
    createEnemyAnimations()
    {
        this.anims.create({
            key: 'enemy-idle',
            frames: [{ key: 'enemy', frame: 'enemy 0.aseprite' }]
        })


        this.anims.create({
            key: 'enemy-walk',
            frameRate: 10,
            frames: this.anims.generateFrameNames('enemy', {
                start: 0, 
                end: 4,
                prefix: 'enemy ',
                suffix: '.aseprite'
            }),
            repeat: -1
        })
    }

}