import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {TextButton} from '../TextButton';
import{limit} from '../../App';

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
        
        this.indivLimit=5;
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

        this.clickCountText2 = this.add.text(100, 300, '');
        this.clickButton2 = new TextButton(this, 500, 300, 'Stamina', { fill: '#0f0'}, () => this.updateClickCountText2());
        this.add.existing(this.clickButton2);

        this.limitCountText = this.add.text(500, 500, '');

        this.menuButton = new TextButton(this, 912, 41, 'MENU', {fill: '#0f0',  fontSize: 20,stroke: '#000000', strokeThickness: 8}, () => this.goToMenu());
        this.add.image(940, 20, 'wood').setScale(0.3);
        this.add.existing(this.menuButton);
        
    

        EventBus.emit('current-scene-ready', this);


    }
    updateClickCountText() {
        
        if (limit[0]>0 && clickCount < this.indivLimit) {
            clickCount++;
            limit[0]--;
        }
       
    }
    updateClickCountText2() {
        if (limit[0] >0 && clickCount2 < this.indivLimit) {
            clickCount2++;
            limit[0]--;
        }
    }
      

    update() {
        if (clickCount < this.indivLimit) {
            this.clickCountText.setText(`Jump Power is at level ${clickCount}.`);
        } else {
            this.clickCountText.setText('Jump Power Has Been MAXED!');
        }
        if (clickCount2 < this.indivLimit) {
            this.clickCountText2.setText(`Stamina is at level ${clickCount2}.`);
        } else {
            this.clickCountText2.setText('Stamina Has Been MAXED!');
        }
        this.limitCountText.setText(`There are ${limit[0]} tokens left.`);

    }

    goToMenu() {
        this.scene.start('Menu');
    }


    
    

    changeScene ()
    {
        this.scene.start('Game');
    }
}
