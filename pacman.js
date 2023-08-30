import { setScreenObj, setGameLevel, drawScreen, drawLevel, movePacman, getLastEaten, drawPoints} from "./js/screen.js";
import { gameLevels } from "./js/level.js";
import { getPosition, getLevelPills} from "./js/utility.js";
import { sObj } from "./js/config.js";

let currentLevel = 0;
let inGameLevel = {};
let pacPos = []
let totalLevelPills

class Juego {
    constructor() {
        setScreenObj(sObj);
        drawScreen();
        setGameLevel([...gameLevels[currentLevel]]);
        drawLevel();
        
    }
    play = () => {
        inGameLevel = [...gameLevels[currentLevel]];
        setGameLevel(inGameLevel);
        pacPos = getPosition(inGameLevel, 5);  //[8, 11]
        totalLevelPills = getLevelPills(inGameLevel, [4,3]);
        // Captura tecla

       let moveHandler = (e) => {
        if (
            ["ArrowLeft", " ArrowRight", "ArrowUp", "ArrowDown"].includes(
            e.key)
            );

            pacPos = movePacman(e.key,pacPos);
            this.socoreValidation(moveHandler);
           
        document.addEventListener("keydown",moveHandler)  
        // verificacion y moveGhost
        gameTime = setInterval(() =>{

        }, 500 / sObj.speed);
    };
    }
    socoreValidation = (moveHandler) => {
        if ([4,3].includes(getLastEaten())) pillToWin++;
        if (getLastEaten() === 4) points += sObj.pointCat.pill;
        if (getLastEaten() === 3) points += sObj.pointCat.superPill;
        if (getLastEaten() === 6) points += sObj.pointCat.ghost;
        clearLastEaten();
        drawPoints(points);

        //win
        if (pillsToWin === totalLevelPills) {
            clearInterval(gameTime);
            document.removeEventListener("keydown", moveHandler, false);
            this.win();
        }
    };

    win =() => {
        currentLevel = 0;
        inGameLevel = {};
        pacPos = [];
        points = 0;
        pillsToWin = 0;
        totalLevelPills = 0;
        drawWin();
        let resetGame = setInterval(() => {
            this.new();
            this.play();
            clearInterval(resetGame);
        }  )
    };
    }


let juegoPacman = new Juego();
juegoPacman.play();

