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
        this.gameButton = new TextButton(this, 500, 200, 'GAME', { fill: '#0f0'}, () => this.goToGame());
        this.upgrade = new TextButton(this, 500, 400, 'UPGRADE', { fill: '#0f0'}, () => this.goToUpgrade());
        this.add.existing(this.gameButton);
        this.add.existing(this.upgrade);
        EventBus.emit('current-scene-ready', this);
    }
    goToGame() {
        this.scene.start('Game');
    }

    goToUpgrade() {
        this.scene.start('UpgradeScreen')
    }
}
