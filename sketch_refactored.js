/*
SNAKE GAME using P5
use arrow keys to move the snake
*/

// settable variables

const canvasSize = 400;
const gridSize = 11;
const snakeStartSpeed = 25; //every 25 ticks the draw function is called -> higher number is slower
const snakeEndSpeed = 8;

//non settable variables

const cellSize = canvasSize / gridSize;
let snakeSpeed = snakeStartSpeed;
let snakeArray = []; //holds snake body parts {x: x, y: y}, the first element is the head of the snake
let foodX = 0;
let foodY = 0;
let snakeArrayDirection = ""; //holds the direction of the snake based on the arrow keys pressed
let timer = 0;

/*----------------- p5.js functions -----------------

setup();
draw();
keyPressed();

*/

function setup() {
  textSize(24);
  createCanvas(canvasSize, canvasSize + 100);
  setNewFoodLocation(gridSize);
  snakeArray.push({ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) });
}

function draw() {
  background(255);
  fill("black");
  text("Score: " + snakeArray.length, 10, canvasSize + 90);
  text("use arrow keys to move", 10, canvasSize + 60);

  drawGrid();
  drawSnake();
  drawFood();
  checkCollision();
  moveSnake();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snakeArrayDirection !== "right") {
    snakeArrayDirection = "left";
  } else if (keyCode === RIGHT_ARROW && snakeArrayDirection !== "left") {
    snakeArrayDirection = "right";
  } else if (keyCode === UP_ARROW && snakeArrayDirection !== "down") {
    snakeArrayDirection = "up";
  } else if (keyCode === DOWN_ARROW && snakeArrayDirection !== "up") {
    snakeArrayDirection = "down";
  }
}

/*----------------- draw functions -----------------

drawGrid();
drawSnake();
drawFood();

*/

function drawGrid() {
  fill("white");
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function drawSnake() {
  fill("black");
  for (let i = 0; i < snakeArray.length; i++) {
    rect(
      snakeArray[i].x * cellSize,
      snakeArray[i].y * cellSize,
      cellSize,
      cellSize
    );
  }
}

function drawFood() {
  fill("red");
  rect(foodX * cellSize, foodY * cellSize, cellSize, cellSize);
}

/*----------------- functions -----------------

setNewFoodLocation();
checkCollision();
moveSnake();
resetGame();

*/

function setNewFoodLocation(gridSize) {
  //find available cells
  let availableCells = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let available = true;
      for (let k = 0; k < snakeArray.length; k++) {
        if (snakeArray[k].x == i && snakeArray[k].y == j) {
          available = false;
        }
      }
      if (available) {
        availableCells.push({ x: i, y: j });
      }
    }
  }

  //set new food location based on available cells
  let randomIndex = Math.floor(random(0, availableCells.length));
  foodX = availableCells[randomIndex].x;
  foodY = availableCells[randomIndex].y;
}

function checkCollision() {
  if (snakeArray[0].x == foodX && snakeArray[0].y == foodY) {
    //snakeArray eats food
    setNewFoodLocation(gridSize);
    snakeArray.push({
      x: snakeArray[snakeArray.length - 1].x,
      y: snakeArray[snakeArray.length - 1].y,
    });
    //speed up the snakeArray when it eats something, but not faster than snakeEndSpeed
    snakeSpeed = snakeSpeed - 1;
    if (snakeSpeed < snakeEndSpeed) {
      snakeSpeed = snakeEndSpeed;
    }
  }
}

function moveSnake() {
  timer++;
  if (timer == snakeSpeed) {
    timer = 0;
    let newHead = { x: snakeArray[0].x, y: snakeArray[0].y };
    if (snakeArrayDirection === "left") {
      newHead.x--;
    } else if (snakeArrayDirection === "right") {
      newHead.x++;
    } else if (snakeArrayDirection === "up") {
      newHead.y--;
    } else if (snakeArrayDirection === "down") {
      newHead.y++;
    }
    snakeArray.unshift(newHead);
    snakeArray.pop();

    for (let i = 1; i < snakeArray.length; i++) {
      
      //check if snakeArray hits itself
      if (
        snakeArray[0].x == snakeArray[i].x &&
        snakeArray[0].y == snakeArray[i].y
      ) {
        resetGame();
      }
    }

    //check if snakeArray hits wall
    if (
      newHead.x < 0 ||
      newHead.x > gridSize - 1 ||
      newHead.y < 0 ||
      newHead.y > gridSize - 1
    ) {
      resetGame();
    }
  }
}

function resetGame() {
  snakeArray = [];
  setNewFoodLocation(gridSize);
  snakeArray.push({ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) });
  snakeSpeed = 25;
  snakeArrayDirection = "";
}
