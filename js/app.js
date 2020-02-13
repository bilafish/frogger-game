// Enemies our player must avoid
var Enemy = function(x, y, moveSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x
    this.y = y
    this.moveSpeed = moveSpeed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.moveSpeed * dt
    if (this.x >= 460) {
      this.x = dt
    }
    this.render()
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
  this.sprite = 'images/char-cat-girl.png'
  // this.x = 0
  // this.y = -20
  this.x = 200
  this.y = 300
  this.moveSpeed = 83
  this.moveXSpeed = 101
  this.update = function() {
    this.render()
  }
  this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Function checks and returns Boolean true/false if user's moves will exceed the game canvas
  this.handleBoundaries = function(x, y) {
    const upper_x_boundary = 402
    const lower_x_boundary = -2
    const lower_y_boundary = 383
    if (x < lower_x_boundary || x > upper_x_boundary || y > lower_y_boundary) {
      return false
    } else {
      return true
    }
  }
  this.handleInput = function(keyInput) {
    switch (keyInput) {
      case 'left':
        if (this.handleBoundaries(this.x-this.moveXSpeed, this.y)) {
          this.x -= 1 * this.moveXSpeed
        }
        break
      case 'right':
        if (this.handleBoundaries(this.x+this.moveXSpeed, this.y)) {
          this.x += 1 * this.moveXSpeed
        }
        break
      case 'up':
        this.y -= 1 * this.moveSpeed
        break
      default:
        if (this.handleBoundaries(this.x, this.y+this.moveSpeed)) {
          this.y += 1 * this.moveSpeed
        }
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(1,60,80), new Enemy(1,140,100), new Enemy(1,220,120)]
const player = new Player()


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
