import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {clickCount} from './UpgradeScreen';

var platforms;
var player;
var cursors;
var jumpHeight = 310;


export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload() {
        this.load.image('tiles', 'assets/world_tileset.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/Testing.json');
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
        let avatar = 'player';
        
      
        player = this.physics.add.sprite(200, 200, avatar);
        player.setScale(0.5).refreshBody();
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
                player.setVelocityY(-jumpHeight);
            }

            jumpHeight = jumpHeight+clickCount;
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
