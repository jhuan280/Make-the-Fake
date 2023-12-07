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

        //coins
        this.coinSound = this.sound.add('coinUp', {volume: 0.2})

        const coins = map.createFromObjects('Collect', { 
            type: 'Coin'   
        })

        this.physics.world.enable(coins)
        coins.forEach((coin)=>{
            coin.body.setSize(16, 16).setOffset(24,24)
            coin.setTexture('coin')
        })

        this.physics.add.collider(this.ben, coins, (ben, coin)=>{
            this.coinSound.play()
            coin.destroy()
            // coinCount += 1
            coinCount++
            console.log(coinCount)
        })   

        //omnitrix
        const omnitrixs = map.createFromObjects('Collect', {
            type: 'Omnitrix'
        })

        this.physics.world.enable(omnitrixs)
        omnitrixs.forEach((omnitrix)=>{
            omnitrix.body.setSize(60, 60).setOffset(2,2)
            omnitrix.setTexture('omnitrix')
        })

        this.physics.add.collider(this.ben, omnitrixs, (ben, omnitrix)=>{
            omnitrix.destroy()
            omnitrixCount++
            console.log(omnitrixCount)
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

        //music and audio
        let loopConfig = {
            volume: 0.1,
            loop: true
        }

        this.music = this.sound.add('bgm', loopConfig)
        this.dead = this.sound.add('dead', {volume: 0.2})
        this.jumpSound = this.sound.add('jump', {volume: 0.2})

        //pausing music
        if (!this.gameOver){
            this.music.play()
        }

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

        if (spaceJustPressed && this.jump && this.ben.body.onFloor() && !this.ben.body.onCeiling()){
            this.ben.setVelocityY(-400)
            this.jumpSound.play()
            this.jump = false
        }


        //basic enemies ----------------------------------------------------------
        this.enemy.update()

        this.physics.add.collider(this.ben, this.enemy, (ben,enemy)=>{
            this.ben.body.setVelocity(0)
            this.dead.play()
            this.gameOver = true

            if (this.gameOver == true){
                this.music.stop()
            }

            this.scene.start('gameOver')

        })

        this.physics.add.collider(this.ben, this.enemy2, (ben,enemy)=>{
            this.ben.body.setVelocity(0)
            this.dead.play()
            this.gameOver = true

            if (this.gameOver == true){
                this.music.stop()
            }

            this.scene.start('gameOver')

        })

        this.physics.add.collider(this.ben, this.enemy3, (ben,enemy)=>{
            this.ben.body.setVelocity(0)
            this.dead.play()
            this.gameOver = true

            if (this.gameOver == true){
                this.music.stop()
            }

            this.scene.start('gameOver')

        })
    }
}