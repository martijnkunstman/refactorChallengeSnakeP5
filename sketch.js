//CODES NEEDs REFACTORING BADLY!!!!!
//CLEAN UP AND REORGANIZE THE CODE TO MAKE IT MORE READABLE AND UNDERSTANDABLE
//DONT CHANGE OR ADD ANY OF THE FUNCTIONALITY OF THE GAME


// settable variables

var SNAKE = []; let foodLocationX = 0; //food location x 
/* 400x400 */ let canvasWidthAndHoogte = 400;
const gridSize = 11; //11x11 grid
let snelheid = 25; //move every 'snelheid' ticks of draw function

/*
------------ drawfood function-------------
*/

function drawFood(color) {
  let kleur = color;                 fill(kleur);
  rect(
    foodLocationX * cellSize,
    food_location_y * cellSize,
    cellSize,    cellSize  );
  return;
}

//the function above draws the food on the canvas, the food is a red square

// ~~~~~~~~~~ functions ~~~~~~~~~~

function setNewFoodLocation(gridSize) {
  foodLocationX = Math.floor(random(0, gridSize));
  food_location_y = Math.floor(random(0, gridSize));
  //check if food is on snake, if so try to set a new food location....
  for (let i = 0; i < SNAKE.length; i++) {
    if (foodLocationX == SNAKE[i].x && food_location_y == SNAKE[i].y) {
      setNewFoodLocation(gridSize);
    }
  }
  /*
        TODO:
        needs new strategy to setNewFoodLocation ->
        check available cells first and take a random cell from the available cells,
        that prevents having to run setNewFoodLocation multiple times, escpecially when the snake is very long
  */

//laat de snake steeds sneller gaan als hij iets eet, maar niet sneller dan 8
snelheid = snelheid - 1;
if (snelheid < 8) {
snelheid = 8;
}


}

function drawGrid() {}
function setHightScore() {}

function setup() {
  //test if setup is called
  let test = "Setup is called";
  console.log(test);

  //TEKEN HET CANVAS......
  createCanvas(canvasWidthAndHoogte, canvasWidthAndHoogte+100);
  setNewFoodLocation(gridSize);

  //plaats de hoofd van de slang in het midden van het canvas
  SNAKE.push({ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) });
}

function drawSnake() {
  fill("black");
  for (let i = 0; i < SNAKE.length; i++) {rect(SNAKE[i].x * cellSize, SNAKE[i].y * cellSize, cellSize, cellSize);
  }
}

function checkCollision(target) {
    //note: target is not used in this function, but it is a placeholder for future use
    if (SNAKE[0].x == foodLocationX && SNAKE[0].y == food_location_y) {
    setNewFoodLocation(gridSize);
    SNAKE.push({ x: SNAKE[SNAKE.length - 1].x, y: SNAKE[SNAKE.length - 1].y });
  }
  return null;
}







//P5 internal keyPressed function - pijltjestoetsen
function keyPressed() {
  if (keyCode === LEFT_ARROW && snakeDirection !== "right") {
    snakeDirection = "left";
  } else if (keyCode === RIGHT_ARROW && snakeDirection !== "left") {
    snakeDirection = "right";
  } else if (keyCode === UP_ARROW && snakeDirection !== "down") {    snakeDirection = "up";  } else if (keyCode === DOWN_ARROW && snakeDirection !== "up") {    snakeDirection = "down";
  }
}









function moveSnake() {
  timer++;
  if (timer == snelheid) {
    timer = 0;
    let newHead = { x: SNAKE[0].x, y: SNAKE[0].y };
    if (snakeDirection === "left") {
      newHead.x--;
    } else if (snakeDirection === "right") {      newHead.x++;    } else if (snakeDirection === "up") {      newHead.y--;    } else if (snakeDirection === "down") {      newHead.y++;    }
    SNAKE.unshift(newHead);
    SNAKE.pop();
    //check if snake hits itself
    for (let i = 1; i < SNAKE.length; i++) {
      if (SNAKE[0].x == SNAKE[i].x && SNAKE[0].y == SNAKE[i].y) {
        //--------------------- move this to a separate function resetGame()
        SNAKE = [];
 setNewFoodLocation(gridSize);
        SNAKE.push({
          x: Math.floor(gridSize / 2),   y: Math.floor(gridSize / 2),        });
        snelheid = 25;
        snakeDirection = "";;;;;;
        //---------------------
      }
    }
    //check if snake hits wall
    if (
      newHead.x < 0 ||
      newHead.x > gridSize - 1 ||
      

      newHead.y < 0 ||
      newHead.y > gridSize - 1
    )
    
    { //--------------------- move this to a separate function resetGame()
      SNAKE = [];
      setNewFoodLocation(gridSize);
      SNAKE.push({ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) });
      snelheid = 25;       snakeDirection = "";
      //---------------------
    }
  }
}






//P5 internal draw function
function draw() 


{


  //----  

  background(255)
        fill("black"); textSize(24)
    text("Score: " + SNAKE.length, 10, canvasWidthAndHoogte + 90)
    text("use arrow keys to move", 10, canvasWidthAndHoogte + 60)




///!!!!!!!!!!!!!!!!!!!!!!!!!!!!! important !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
// start - TODO: move this code to a separate function drawGrid()
fill("white")
for (let i = 0; i <= gridSize; i++) {
for (let j = 0; j <= gridSize; j++) {
rect(i * cellSize, j * cellSize, cellSize, cellSize)
}
}
// end - TODO: move this code to a separate function drawGrid()





  drawSnake();;//;
                drawFood("red");
  checkCollision(null);

  moveSnake(); //moving the snake only happens every 'snelheid' times that the 'draw' function is called
}

// settable variables

let food_location_y = 0; //not settable
const cellSize = canvasWidthAndHoogte / gridSize;





    //****_________ nodig voor het spel maar niet instelbaar
    let snakeDirection = "";
    var timer = 0;