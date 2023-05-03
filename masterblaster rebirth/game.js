import { TILE_COLOR, TANK_COLOR, ENEMY_COLOR, BULLET_COLOR } from "./constants.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Draw terrain tile
const terrainTile = new Image();
terrainTile.src = "terrain.png";
terrainTile.onload = function() {
  ctx.drawImage(terrainTile, 0, 0, 16, 16, 0, 0, 48, 48);
};

// Draw tank sprite
const tankSprite = new Image();
tankSprite.src = "tank.png";
tankSprite.onload = function() {
  ctx.drawImage(tankSprite, 0, 0, 16, 16, 100, 100, 48, 48);
};

// Tank object
const tank = {
  x: 50,
  y: canvas.height - 100,
  width: 48,
  height: 48,
  color: TANK_COLOR
};

// Bomb object
class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = "red";
    this.speed = 5;
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// List of active bombs
const bombs = [];

// Handle keyboard input
const keysPressed = {};
document.addEventListener("keydown", function(event) {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function(event) {
  keysPressed[event.key] = false;
});

// Game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw terrain tile
  ctx.drawImage(terrainTile, 0, 0, 16, 16, 0, 0, 48, 48);

  // Move tank
  if (keysPressed["ArrowLeft"]) {
    tank.x -= 5;
  }
  if (keysPressed["ArrowRight"]) {
    tank.x += 5;
  }
  if (keysPressed["ArrowUp"]) {
    tank.y -= 5;
  }
  if (keysPressed["ArrowDown"]) {
    tank.y += 5;
  }

  // Draw tank
  ctx.fillStyle = tank.color;
  ctx.fillRect(tank.x, tank.y, tank.width, tank.height);

  // Drop bomb
  if (keysPressed[" "]) {
    bombs.push(new Bomb(tank.x + tank.width / 2, tank.y + tank.height));
  }

  // Update and draw bombs
  bombs.forEach(bomb => {
    bomb.update();
    bomb.draw();
  });

  // Request next frame
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
