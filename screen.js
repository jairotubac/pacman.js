let canvas; 
let context;
let sObj = {};
let level = [];
let x = 0, y = 0;
let lastEaten;


let setScreenObj = (screenObj) => {
    sObj = screenObj;
};
let getLastEaten =() => {
    return lastEaten;
};

let setGameLevel = (gameLevel) => {
    level = gameLevel;
    
}

let drawScreen = () => {

    canvas = document.getElementById(sObj.canvasId);
    console.log(sObj.height);
    canvas.height = sObj.height;
    canvas.width = sObj.width;
    context = canvas.getContext("2d");
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(0,0,sObj.width,sObj.height);
};

let drawLevel = () =>{
    for (const yElement of level){
       for (const xElement of yElement){
        if(xElement === 1){
            context.fillStyle = "blue";
            context.fillRect(x, y, sObj.dimension, sObj.dimension);
        } else if(xElement===4){
            context.beginPath();
            context.fillStyle = "greenyellow"
            context.arc(x + sObj.dimension / 2,
            y + sObj.dimension / 2,
            sObj.dimension / 8,
            0,
            Math.PI * 2,
            true);
            context.closePath();
            context.fill();
        }else if(xElement===5){
            context.beginPath();
            context.fillStyle = "yellow"
            context.arc(
            x + sObj.dimension / 2,
            y + sObj.dimension / 2,
            sObj.dimension / 2.5,
            Math.PI * 1.75,
            Math.PI* 0.25,
            true);
            context.lineTo( x + sObj.dimension / 2,
            y + sObj.dimension / 2,)
            context.closePath();
            context.fill();
        
        }else if(xElement===3){
            context.beginPath();
            context.fillStyle = "aqua"
            context.arc(x + sObj.dimension / 2,
            y + sObj.dimension / 2,
            sObj.dimension / 5,
            0,
            Math.PI * 2,
            true);
            context.closePath();
            context.fill();
        }
        x = x + sObj.dimension;
       }
      x = 0;
       y = y + sObj.dimension;
    }
};

let movePacman = (dir, pos) =>{
  let arrPosx = 0, 
      arrPosy = 0;
  let nextPos = 0, 
      prevPos = 0;
  if (dir == "ArrowLeft" ){
      arrPosx = pos[0] -1;
      arrPosy = pos[1];
      nextPos = level[arrPosy][arrPosx];
  } else if(dir === "ArrowRight"){
    arrPosx = pos[0] + 1;
    arrPosy = pos[1];
    nextPos = level[arrPosy][arrPosx];
  } if (dir == "ArrowUp" ){
    arrPosx = pos[0];
    arrPosy = pos[1] - 1;
    nextPos = level[arrPosy][arrPosx];
} else if(dir === "ArrowDown"){
  arrPosx = pos[0] ;
  arrPosy = pos[1] + 1;
  nextPos = level[arrPosy][arrPosx];
}
  if ([0,3,4,6].includes(nextPos)){
    console.log(arrPosx, level[0].length-1);
    if(arrPosx === level[0].length-1) {
        level[pos[1][pos[0]]] = 0;
        arrPosx = 0;
        level[arrPosy][arrPosx] = 5;
    } else if(arrPosx === 0) {
        level[pos[1]][pos[0]] = 0;
        arrPosx = level[0].length - 1;
        level[arrPosy][arrPosx] = 5;
    }

    lastEaten = nextPos;
    level[pos[1]][pos[0]] = 0;
    level[arrPosy][arrPosx] = 5;
    pos = [arrPosx, arrPosy];
    drawPacman(dir, pos);
  }
    return pos;
 }

let drawPacman = (dir, pos) => {
let x = pos[0] * sObj.dimension,
 y = pos[1] * sObj.dimension;

 clearSpace(dir, pos);
 //  "ArrowLeft" FLECHA IZQUERDA
if (dir === "ArrowLeft") {
context.beginPath();   //COMENZAR EL CAMINO
context.fillStyle = "yellow"
context.arc(
  x + sObj.dimension /2,
  y + sObj.dimension /2,
  sObj.dimension / 2.5, //tamaño
  Math.PI * 0.75,
  Math.PI * 1.25,
  true
);
context.lineTo(x + sObj.dimension / 2,
             y + sObj.dimension / 2
           );
context.closePath();   //TERMINAR EL CAMINO
context.fill();

} else if (dir === "ArrowRight"){
    context.beginPath();
   context.fillStyle = "yellow"
   context.arc(
   x + sObj.dimension / 2,
   y + sObj.dimension / 2,
   sObj.dimension / 2.5,
   Math.PI * 1.75,
   Math.PI* 0.25,
   true
   );
   context.lineTo( x + sObj.dimension / 2,
           y + sObj.dimension / 2,)
   context.closePath();
   context.fill();  
} if (dir === "ArrowUp"){
    context.beginPath();
   context.fillStyle = "yellow"
   context.arc(
   x + sObj.dimension / 2,
   y + sObj.dimension / 2,
   sObj.dimension / 2.5,
   Math.PI * 1.25,
   Math.PI* 1.75,
   true
   );
   context.lineTo( x + sObj.dimension / 2,
           y + sObj.dimension / 2,)
   context.closePath();
   context.fill();  
} else if (dir === "ArrowDown"){
   context.beginPath();
  context.fillStyle = "yellow "
  context.arc(
  x + sObj.dimension / 2,
  y + sObj.dimension / 2,
  sObj.dimension / 2.5,
  Math.PI * 0.25,
  Math.PI* 0.75,
  true
  );
  context.lineTo( x + sObj.dimension / 2,
          y + sObj.dimension / 2,)
  context.closePath();
  context.fill();  
}
};

let clearSpace = (dir, pos) => {
    let cSx = pos[0],
        cSy = pos[1];
        
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(
        cSx * sObj.dimension,
        cSy * sObj.dimension,
        sObj.dimension,
        sObj.dimension
    );
    if (dir === "ArrowLeft") {
        cSx++;
    } else if (dir === "ArrowRight"){
        cSx--;
    } 
    if (dir === "ArrowUp") {
        cSy--;
    } else if (dir === "ArrowDown"){
        cSy++;
    }
    context.fillRect(
        cSx * sObj.dimension,
        cSy * sObj.dimension,
        sObj.dimension,
        sObj.dimension
    );

};

let drawPoints = (points) => {
    context.fillStyle = sObj.backgroundColor;
    context.fillRect((level[0].length + 4) * sObj.dimension - 1, 14, 35, 18);
    context.fillStyle = "yellow";
    context.fonts = "20px Arial";
    context.fillText(points, (level[0].length + 4) * sObj.dimension, 30);
};


export { setScreenObj, setGameLevel, drawScreen, drawLevel, movePacman, getLastEaten, drawPoints};