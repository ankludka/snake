var canvas;
var canvasContext;
var headX = 10;
var headY = 10;
var headSize = 25;

const HEAD_SPEED = headSize;

var headMoveX = HEAD_SPEED;
var headMoveY = 0;

var snakeLenght = 3;
var snake = [];

var itemX;
var itemY;
const ITEM_SIZE = 10;





window.onload = function() {
    canvas = document.getElementById('game');
    canvasContext = canvas.getContext('2d');
 
    var framesPerSecond = 3;
    setInterval(function() {
        move();
        drawGame();
    }, 1000 / framesPerSecond);

    window.addEventListener("keydown", changeDirection);

    spawnNewItem();

    }



function drawGame(){

    clearBoard();
    drawItem();
    drawSnake();
    eatItem();
 
}

function clearBoard(){
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    for (let i = 0; i < snakeLenght; i++){

        canvasContext.fillStyle = 'white';  
        canvasContext.fillRect(snake[i].headX-1, snake[i].headY-1, headSize+2, headSize+2);
        let max = getRandomInt(1,50000);
        let lessThanMax = getRandomInt(1,max);
        canvasContext.fillStyle = rainbow(max, lessThanMax);
        canvasContext.fillRect(snake[i].headX, snake[i].headY, headSize, headSize);
    }
}

function move(){

    headX += headMoveX;
    headY += headMoveY;

    passBorders();

    snake.unshift({headX, headY});
    if(snake.length > snakeLenght)
        snake.pop();
   
}

function passBorders(){
    if(headX > canvas.width)
        headX = -headSize;
    if(headX + headSize < 0)
        headX = canvas.width
    if(headY > canvas.height)
        headY = -headSize;
    if(headY + headSize < 0)
        headY = canvas.height;
}

function changeDirection(event){
    switch(event.key){
        case "ArrowUp": {
            if(headMoveY != HEAD_SPEED){
                headMoveY = -HEAD_SPEED;
                headMoveX = 0;
            }
            
        };
        break;
        case "ArrowDown": {
            if(headMoveY != -HEAD_SPEED){
                headMoveY = HEAD_SPEED;
                headMoveX = 0;
            }
        };
        break;
        case "ArrowLeft": {
            if(headMoveX != HEAD_SPEED){
            headMoveY = 0;
            headMoveX = -HEAD_SPEED;
            }
        };
        break;
        case "ArrowRight": {
            if(headMoveX != -HEAD_SPEED){
            headMoveY = 0;
            headMoveX = HEAD_SPEED;
            }
        };
        break;
    }
}

function spawnNewItem (){
    itemX = getRandomInt(0 + ITEM_SIZE, canvas.width - ITEM_SIZE);
    itemY = getRandomInt(0 + ITEM_SIZE, canvas.height - ITEM_SIZE);
}

function drawItem(){
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(itemX, itemY, ITEM_SIZE, ITEM_SIZE);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function eatItem(){
    let xCenter = itemX + (ITEM_SIZE/2);
    let yCenter = itemY + (ITEM_SIZE/2);

    if(xCenter >= headX && xCenter <= (headX + headSize) &&
       yCenter >= headY && yCenter <= (headY + headSize)){
        spawnNewItem();
        snakeLenght++;
    }
}

// https://stackoverflow.com/questions/1484506/random-color-generator by Adam Cole
function rainbow(numOfSteps, step) {
    
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}