import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

var platforms;
var player;
var cursors;


export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // initializations
        
        this.cameras.main.setBackgroundColor(0x00ff00);
        cursors = this.input.keyboard.createCursorKeys();

        // platforms
        
        let plat = 'ground';
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, plat).setScale(2).refreshBody();
        platforms.create(600, 400, plat);
        platforms.create(50, 250, plat);
        platforms.create(750, 220, plat);
        
        // player
        // sprite sheet will wait 
        let avatar = 'star';
        player = this.physics.add.sprite(450, 450, avatar);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.body.setGravityY(300);
        this.physics.add.collider(player, platforms);
 
    
        


        EventBus.emit('current-scene-ready', this);
    }
    update () {
        if (cursors.left.isDown)
            {
                player.setVelocityX(-160);
            
                player.anims.play('left', true);
                
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(160);
            
                player.anims.play('right', true);
            }
            else
            {
                player.setVelocityX(0);
            
                player.anims.play('turn');
            }
            
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-330);
            }
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
    

    
        
            
}
