//Enemy prefab
class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        // this.enemyMoveSpeed = 100;
    }

    update(){

        // this.x += this.enemyMoveSpeed * 100

        // console.log(this.x)
        if (this.x <= 0){
            this.reset()
            // console.log("test")
        }
    }

    reset(){
        this.x = game.config.width
    }

}
