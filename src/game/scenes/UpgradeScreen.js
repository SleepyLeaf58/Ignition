import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {TextButton} from '../TextButton';

var clickCount = 0;
export{clickCount};

export class UpgradeScreen extends Scene
{
    constructor ()
    {
        super('UpgradeScreen');
    }

    create ()
    {
        
        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.text(512, 384, 'UPGRADE SCREEN', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

    
        this.clickCountText = this.add.text(100, 200, '');
    
        this.clickButton = new TextButton(this, 100, 100, 'Click me!', { fill: '#0f0'}, () => this.updateClickCountText());
        this.add.existing(this.clickButton);
    
        this.updateClickCountText();
    

        EventBus.emit('current-scene-ready', this);


    }
    updateClickCountText() {
        this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
        clickCount++;
    }
    
    

    changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
