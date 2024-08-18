import { useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';



function App ()
{
    const mathQuestions = [
        {
          question: "Solve for x: 2x^2 - 4x - 6 = 0",
          answer: "-1,3"
        },
        {
          question: "Find the value of x in the equation: 3^(x+1) = 81",
          answer: "3"
        },
        {
          question: "What is the value of sin(45°) + cos(45°)?",
          answer: "sqrt(2)"
        },
        {
          question: "Calculate the area of a triangle with base 10 cm and height 7 cm.",
          answer: "35"
        },
        {
          question: "Find the x-intercepts of the quadratic function f(x) = x^2 - 5x + 6.",
          answer: "2, 3"
        },
        {
          question: "Solve the system of equations: 2x + 3y = 12 and x - y = 1.",
          answer:  "x: 3, y: 1" 
        },
        {
          question: "What is the derivative of f(x) = 3x^3 - 5x^2 + 2x - 7?",
          answer: "9x^2 - 10x + 2"
        },
        {
          question: "Find the hypotenuse of a right triangle with legs of lengths 6 and 8.",
          answer: "10"
        },
        {
          question: "If the function f(x) = 2x^2 - 4x + 1, find the vertex of the parabola.",
          answer: "x: 1, y: -1"
        },
        {
          question: "What is the volume of a cylinder with radius 3 cm and height 7 cm?",
          answer: "197.92" // Volume = π * r^2 * h
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
            alert('you got it correct!, here\'s your reward')
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
                    <button className="button" onClick={handleMath}>Refill Something</button>
                </div>
            </div>
        </div>
    )
}

export default App
