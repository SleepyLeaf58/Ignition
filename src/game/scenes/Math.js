
import Phaser from 'phaser';

export class Math extends Phaser.Scene {
  constructor() {
    super('Math');
  }

  preload() {
    // Load assets here if needed
  }

  create() {
    this.load.html('input', 'input.html');
    this.add.dom().createFromCache('input');
    
  }

  update() {
    // Update logic here
  }

  changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
