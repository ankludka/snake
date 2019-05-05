var canvas;
var canvasContext;
var headX = 10;
var headY = 10;
var headSize = 25;

const HEAD_SPEED = headSize;

var headMoveX = HEAD_SPEED;
var headMoveY = 0;

var snakeLenght = 6;
var snake = [];





window.onload = function() {
    canvas = document.getElementById('game');
    canvasContext = canvas.getContext('2d');
 
    var framesPerSecond = 3;
    setInterval(function() {
        move();
        draw();
    }, 1000 / framesPerSecond);

    window.addEventListener("keydown", changeDirection);

    }



function draw(){

    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // sprite
    canvasContext.fillStyle = 'black';
    //canvasContext.fillRect(headX, headY, headSize, headSize);

    for (let i = 0; i < snakeLenght; i++){
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
            headMoveY = -HEAD_SPEED;
            headMoveX = 0;
        };
        break;
        case "ArrowDown": {
            headMoveY = HEAD_SPEED;
            headMoveX = 0;
        };
        break;
        case "ArrowLeft": {
            headMoveY = 0;
            headMoveX = -HEAD_SPEED;
        };
        break;
        case "ArrowRight": {
            headMoveY = 0;
            headMoveX = HEAD_SPEED;
        };
        break;
    }
}