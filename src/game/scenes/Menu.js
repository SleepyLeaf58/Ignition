import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {TextButton} from '../TextButton';

export class Menu extends Scene
{
    constructor ()
    {
        super('Menu');
    }

    create ()
    {
        //this.cameras.main.setBackgroundColor(0xff0000);
        this.gameButton = new TextButton(this, 450, 180, 'GAME', {fill: '#0f0',  fontSize: 64,stroke: '#000000', strokeThickness: 8}, () => this.goToGame());
        this.upgrade = new TextButton(this, 430, 610, 'UPGRADE', { fill: '#0f0',  fontSize: 50,stroke: '#000000', strokeThickness: 8}, () => this.goToUpgrade());
        this.add.image(530, 100, 'wood');
        this.add.image(538, 520, 'wood');

        
        
        this.add.existing(this.gameButton);
        this.add.existing(this.upgrade);
        EventBus.emit('current-scene-ready', this);
    }
    goToGame() {
        this.scene.switch('Game');
    }

    goToUpgrade() {
        this.scene.start('UpgradeScreen')
    }
}
