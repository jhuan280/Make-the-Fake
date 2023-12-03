class Play extends Phaser.Scene{

    constructor(){
        super("playScene")
    }


    create(){

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

        //game over
        this.gameOver = false

        //player
        const {width, height} = this.scale
        this.ben = this.physics.add.sprite(width * 0.5, height * 0.5, 'ben').play('player-idle')
        this.ben.body.setSize(10,50).setOffset(25, 16)
        this.ben.body.setCollideWorldBounds(true)
        this.ben.body.setGravityY(650)

        this.physics.add.collider(this.ben, terrainLayer, ()=>{
            this.jump = true
        })

        //enemy 1
        this.enemy = new Enemy(this, 656, 768, 'enemy', 0)
        this.enemy.setVelocityX(-500)
        this.enemy.play("enemy-walk")
        // this.enemy.body.setCollideWorldBounds(true)
        this.enemy.body.setSize(30,50).setOffset(15, 16)

        //enemy 2 
        this.enemy2 = new Enemy(this, 1056, 304, 'enemy', 0)
        this.enemy2.body.setSize(30,50).setOffset(15, 16)

        //enemy 3
        this.enemy3 = new Enemy(this, 320, 304, 'enemy', 0)
        this.enemy3.body.setSize(30,50).setOffset(15, 16)

        //camera
        this.cameras.main.setZoom(1.5)
        this.cameras.main.startFollow(this.ben)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)


        //keyboard inputs
        this.cursors = this.input.keyboard.createCursorKeys()
    }


    update(){

        //player movement ------------------------------------------------------------
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


        //basic enemies ----------------------------------------------------------
        this.enemy.update()

        this.physics.add.collider(this.ben, this.enemy, (ben,enemy)=>{
            this.ben.body.setVelocity(0)
            this.gameOver = true
            this.scene.start('gameOver')

        })

        this.physics.add.collider(this.ben, this.enemy2, (ben,enemy)=>{
            this.ben.body.setVelocity(0)
            this.gameOver = true
            this.scene.start('gameOver')

        })

        this.physics.add.collider(this.ben, this.enemy3, (ben,enemy)=>{
            this.ben.body.setVelocity(0)
            this.gameOver = true
            this.scene.start('gameOver')

        })


    }


}