import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import{UpgradeScreen} from'./scenes/UpgradeScreen';
import { Math } from "./scenes/Math"
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { Menu } from './scenes/Menu';
import {WinScreen} from './scenes/WinScreen';


// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        UpgradeScreen,
        Math,
        Menu,
        WinScreen
    ]
    
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
