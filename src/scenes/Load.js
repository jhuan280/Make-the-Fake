class Load extends Phaser.Scene{
    constructor(){
        super("loadScene")
    }

    preload(){
        this.load.path = './assets/'

        this.load.atlas('ben', 'ben.png', 'ben.json')
        this.load.atlas('enemy', 'enemy.png', 'enemy.json')
        this.load.atlas('enemy2', 'enemy.png', 'enemy.json')
        this.load.atlas('enemy3', 'enemy.png', 'enemy.json')

        //tileset load
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')
    }

    create(){
        //create animations
        this.createBenAnimations()
        this.createEnemyAnimations()


        this.scene.start('playScene')
    }

//animations --------------------------------------------------------------------------------------

    //player animations
    createBenAnimations(){
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
    createEnemyAnimations(){
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