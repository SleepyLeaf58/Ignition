import { useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';

let limit = [0];
export{limit};


function App ()
{
    const mathQuestions = [
        {
          question: "What is the sum of the roots of (2x+1)(x-3)+(2x+3)(x-3) = 0",
          answer: "2"
        },
        {
          question: "Joe went to the bank and withdrew $80. The teller gave her this amount using $20 bills, $50 bills and $100 bills with at least one of each denomination. How many different collections of bills could Joe have received?",
          answer: "21"
        },
        {
          question: "How many ways can 5 books be arranged on a shelf if book 1 and 2 must be beside another",
          answer: "48"
        },
        {
          question: "Find the value of 101!/99!",
          answer: "10100"
        },
        {
          question: "Find the sum of the odd integers between 10 and 50.",
          answer: "600"
        },
        {
          question: "If x+y=4 and xy=2, find x^6+y^6",
          answer:  "1584" 
        },
        {
          question: "An equilateral triangle and a regular hexagon have equal perimeters. If the area of the triangle is 2, find the area of the hexagon.",
          answer: "3"
        },
        {
          question: "Find the GCF of 36,27, and 45.",
          answer: "9"
        },
        {
          question: "How many multiples of 7 are there between 100 and 200?",
          answer: "14"
        },
        {
          question: "A singles tournament had six players. Each player played every other player only once, with no ties. If Helen won 4 games, Ines won 3 games, Janet won 2 games, Kendra won 2 games and Lara won 2 games, how many games did Monica win?",
          answer: "2"
        }
      ];
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {

        const scene = phaserRef.current.scene;

        if (scene)
        {
            scene.changeScene();
        }
    }

    const moveSprite = () => {

        const scene = phaserRef.current.scene;

        if (scene && scene.scene.key === 'MainMenu')
        {
            // Get the update logo position
            scene.moveLogo(({ x, y }) => {

                setSpritePosition({ x, y });

            });
        }
    }

    const addSprite = () => {

        const scene = phaserRef.current.scene;

        if (scene)
        {
            // Add more stars
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            const star = scene.add.sprite(x, y, 'star');

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            //  You could, of course, do this from within the Phaser Scene code, but this is just an example
            //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        
    }

    const handleMath = () => {
        const randomIndex = Math.floor(Math.random() * mathQuestions.length);
        let q = mathQuestions[randomIndex].question;
        let answer = prompt(q)
        if (answer == mathQuestions[randomIndex].answer) {
            alert('you got it correct!, You get an upgrade token!')
            limit[0]=limit[0]+1;
        }
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div>
                <div>
                    <button className="button" onClick={changeScene}>Change Scene</button>
                </div>
                <div>
                    <button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</button>
                </div>
                <div className="spritePosition">Sprite Position:
                    <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
                </div>
                <div>
                    <button className="button" onClick={addSprite}>Add New Sprite</button>
                    
                </div>
                <div>
                    <button className="button" onClick={handleMath}>Get Upgrade Token</button>
                </div>
            </div>
        </div>
    )
}

export default App
