import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {TextButton} from '../TextButton';






export class WinScreen extends Scene
{
    constructor ()
    {
        super('WinScreen');
    }

    preload() {
        this.load.image('knight', 'assets/sprites/hero.png');
        this.load.atlas('a-knight', 'assets/sprites/knight.png', 'assets/sprites/knight.json');
    }

    create ()
    {
        this.anims.create({
            key: 'roll',
            frameRate: 12,
            frames: this.anims.generateFrameNames('a-knight', {
                prefix: "roll",
                suffix: ".png",
                start: 1,
                end: 8,
            }),
            repeat:-1,
        })

        this.sprite = this.add.sprite(510, 200, 'a-knight').setScale(2);

       


        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.text(512, 384, 'YOU WIN!', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

    }
    update(){
        this.sprite.anims.play('roll', true);
    }
    
      

    changeScene ()
    {
        this.scene.start('Game');
    }
}
