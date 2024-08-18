import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {TextButton} from '../TextButton';

let clickCount = 0;
export{clickCount};
let clickCount2 = 0;
export{clickCount2};

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
        this.clickButton = new TextButton(this, 500, 200, 'Jump', { fill: '#0f0'}, () => this.updateClickCountText());
        this.add.existing(this.clickButton);
        this.updateClickCountText();

        this.clickCountText2 = this.add.text(100, 300, '');
        this.clickButton2 = new TextButton(this, 500, 300, 'Stamina', { fill: '#0f0'}, () => this.updateClickCountText2());
        this.add.existing(this.clickButton2);
        this.updateClickCountText2();
    

        EventBus.emit('current-scene-ready', this);


    }
    updateClickCountText() {
        this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
        clickCount++;
    }
    updateClickCountText2() {
        this.clickCountText2.setText(`Button has been clicked ${clickCount2} times.`);
        clickCount2++;
    }


    
    

    changeScene ()
    {
        this.scene.start('Game');
    }
}
