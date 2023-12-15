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
        let coinCount = 0
        let omnitrixCount = 0

        //player
        const {width, height} = this.scale
        this.ben = this.physics.add.sprite(width * 0.5, height * 0.5, 'ben').play('player-idle')
        this.ben.body.setSize(10,50).setOffset(25, 16)
        this.ben.body.setCollideWorldBounds(true)
        this.ben.body.setGravityY(650)

        //setting keys for player attack
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.cooldown = false

        //player attack
        this.attack = this.physics.add.image(this.ben.x, this.ben.y, 'star').setScale(2)
        this.attack.body.setSize(20,16).setOffset(12,9)
        this.attack.setAlpha(0)
        this.attack.setImmovable()

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
            this.coinScore = this.add.text(game.config.width/3.8, borderUISize + borderPadding * 0.5, 'Coins: ' + coinCount, timeConfig).setOrigin(0.5, 1)
        })   

        //omnitrix
        this.omniSound = this.sound.add('omniUp', {volume: 0.2})
        const omnitrixs = map.createFromObjects('Collect', {
            type: 'Omnitrix'
        })

        this.physics.world.enable(omnitrixs)
        omnitrixs.forEach((omnitrix)=>{
            omnitrix.body.setSize(60, 60).setOffset(2,2)
            omnitrix.setTexture('omnitrix')
        })

        this.physics.add.collider(this.ben, omnitrixs, (ben, omnitrix)=>{
            this.omniSound.play()
            omnitrix.destroy()
            omnitrixCount++
            console.log(omnitrixCount)
            this.omniScore = this.add.text(game.config.width - 150, borderUISize + borderPadding * 0.5, 'Omnitrixs: ' + omnitrixCount, timeConfig).setOrigin(0.5, 1)
        })

        //enemy 1
        this.enemy = new Enemy(this, 656, 768, 'enemy', 0)
        this.enemy.setVelocityX(-500)
        this.enemy.play("enemy-walk")
        // this.enemy.body.setCollideWorldBounds(true)
        this.enemy.body.setSize(30,50).setOffset(15, 16)

        this.physics.add.collider(this.attack, this.enemy, ()=>{
            this.enemy.destroy()
        }, null, this 
        )

        //enemy 2 
        this.enemy2 = new Enemy(this, 1056, 304, 'enemy', 0)
        this.enemy2.body.setSize(30,50).setOffset(15, 16)

        this.physics.add.collider(this.attack, this.enemy2, ()=>{
            this.enemy2.destroy()
        }, null, this 
        )

        //enemy 3
        this.enemy3 = new Enemy(this, 320, 304, 'enemy', 0)
        this.enemy3.body.setSize(30,50).setOffset(15, 16)

        this.physics.add.collider(this.attack, this.enemy3, ()=>{
            this.enemy3.destroy()
        }, null, this 
        )

        //gate
        this.gate = this.physics.add.image(centerX + 180, 960/11, 'gate')
        this.gate.body.setSize(35,30)
        this.gate.setOffset(14,8)
        this.physics.add.collider(this.ben, this.gate, (ben,gate)=>{

            if (omnitrixCount >= 1 && coinCount >= 4){
                this.music.stop()
                this.scene.start('winScene')
            }
            else{
                console.log('true')
                this.gate.setVelocityX(0)
                this.gate.setImmovable(true)
            }
        })

        //time stuff
        timer = game.settings.gameTimer

        let timeConfig = {
            fontFamily: 'Courier New',
            fontSize: '30px',
            backgroundColor: '#ADD8E6',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.timerDisplay = this.add.text(game.config.width/2, borderUISize + borderPadding * 0.5, 'Time: ' + (timer / 1000), timeConfig).setOrigin(0.5, 1)

        this.clock = this.time.addEvent({
            delay: 1000,
            callback: () => {
                timer += 1
                this.timerDisplay.text = timer
            },
            callbackScope:this,
            loop: true
        });

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
        if (timer == 60){
            this.music.stop()
            this.scene.start('gameOver')
        }

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

        if (Phaser.Input.Keyboard.JustDown(this.keyW) && this.cooldown == false){
            // console.log('fire')
            this.cooldown = true
            this.attack.setAlpha(1)

            this.time.delayedCall(1000, ()=>{
                // console.log()
                this.attack.setAlpha(0).setPosition(0,0)
                this.cooldown = false
                // this.attack.destroy()
            })

            this.attack.x = this.ben.x
            this.attack.y = this.ben.y*1.05

            //making the star move
            if (this.ben.flipX == true){
                this.attack.setVelocityX(-100)
            }
            else{
                this.attack.setVelocityX(100)
            }


        }


        //basic enemies ----------------------------------------------------------
        this.enemy.update()

        //ben with enemy 1
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