function Snake() {
  // initial values.
  this.x = getRandPositions(width);
  this.y = getRandPositions(height);
  this.xspeed = 0;
  this.yspeed = 0;
  this.level = 0;
  this.tail = [];
  this.isDead = false;
  this.previousPosition = undefined;

  // update the positions of both the head and whatever tail the snake may have.
  this.update = function() {
    // push the position of the head to the previous head.
    for (var i = 0; i < this.level; i++) {
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.level-1] = createVector(this.x, this.y);

    // save the previous position of the head, useful for when the head hits a wall.
    this.previousPosition = createVector(this.x, this.y);

    // change the coordinates x,y of the head by adding the values of their speed, limited to the grid size.
    this.x = constrain(this.x+this.xspeed, 0, width-grid);
    this.y = constrain(this.y+this.yspeed, 0, height-grid);
  }
  // display the head and the tail.
  this.display = function() {
    // display the head
    fill(255);
    rect(this.x, this.y, grid, grid);

    // display each block of the tail.
    for (var i = 0; i < this.level; i++) {
      rect(this.tail[i].x, this.tail[i].y, grid, grid);
    }
  }
  // change the value of the speed based on keyPressed() global function, each speed only changes if it's not currently set as it's opposite (meaning if it's going upwards it can't go directly downwards).
  this.move = function(x, y) {
    if (this.xspeed !== -x*grid) {
      this.xspeed = constrain(x, -1, 1)*grid;
    }
    if (this.yspeed !== -y*grid) {
      this.yspeed = constrain(y, -1, 1)*grid;
    }
    return false; // prevent any default behaviour.
  }
  // add a new block to the tail when the snake eats.
  this.eat = function() {
    this.level++;
    this.tail.push(createVector(this.x, this.y));
  }
  // the snake dies if its head doesn't change position between frames (meaning it has hit a wall) or if it hits its tail.
  this.death = function() {
    // let the initial state (both speeds = 0) not affect the state of the snake (dead or alive).
    if (this.xspeed === 0 && this.yspeed === 0) {
      this.isDead = false;
    }
    // the snake hits a part of its tail.
    else {
      for (var i = 0; i < this.level; i++) {
        if (this.tail[i-1].x === this.x && this.tail[i-1].y === this.y) {
          this.isDead = true;
        }
      }
      // the snake hits the wall.
      if (this.previousPosition.x === this.x && this.previousPosition.y === this.y) {
        this.isDead = true;
      }
    }
  }
}

function Food() {
  this.x = getRandPositions(width);
  this.y = getRandPositions(height);

  // display food object in a already calculated location.
  this.display = function() {
    fill("red");
    rect(this.x, this.y, grid, grid);
  }
  // get a new x,y coordinates for the location of the food object.
  this.update = function() {
    this.x = getRandPositions(width);
    this.y = getRandPositions(height);
  }
}

// getRandPositions: num -> num
// get a random position based on an array that calculates all the positions from 0 to max based on a step (grid).
function getRandPositions(max) {
  var positions = [];
  for (var i = 0; i < max; i+=grid) {
    positions.push(i);
  }
  return random(positions);
}
