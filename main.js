// initial global variables.
var snake;
var food;
var grid = 20;

// this runs only once.
function setup() {
  // use this so that the app is rendered in a division with #app-holder id in the html.
  var canvas = createCanvas(640, 480);
  canvas.parent("app-holder");
  // initial objects.
  snake = new Snake();
  food = new Food();
  noStroke();
  textAlign(CENTER);
  frameRate(10); // used so everything updates at a playable pace.
}

// this runs in a loop.
function draw() {
  background(55);
  // if the snake is dead, stop updating the snake's position and display death message.
  if (snake.isDead) {
    console.log("You are dead, not a big surprise.");

    textSize(36);
    text("Game Over", width/2, height/2);
    textSize(18);
    text("Press ENTER to restart.", width/2, height/2+2*grid);
  }
  // if the snake is not dead, update the snake's position
  else {
    snake.update();
  }

  // display snake and food objects
  snake.display();
  food.display();

  // if the snake's position overlaps with the food's, eat it.
  if (snake.x === food.x && snake.y === food.y) {
    food.update();
    snake.eat();
  }
  // always check if the snake dies or not.
  snake.death();

  // keep track of the score.
  fill("yellow");
  textSize(24);
  text(`Score: ${snake.level}`, width-4*grid, height-grid);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.move(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.move(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.move(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.move(1, 0);
  }
  // only if the snake is dead can the user press enter to restart the game.
  else if (keyCode === ENTER && snake.isDead) {
    snake = new Snake();
    food = new Food();
  }
  return false; // prevent any default behaviour.
}
