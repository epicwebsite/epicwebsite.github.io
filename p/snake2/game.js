var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

class Snake {
  constructor() {
    this.segs = [];
    
    this.add(
      (data.grid.x / 2).round(),
      (data.grid.y / 2).round(),
    );
  }
  add(x, y) {
    if (x == undefined) {
      x = this.segs[this.segs.length - 1].x;
    }
    if (y == undefined) {
      y = this.segs[this.segs.length - 1].y + 1;
    }
    this.segs.push(new Snake.Segment(x, y));
  }
}
Snake.Segment = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Food {
  constructor() {
    this.x = F.randomInt(0, data.grid.x);
    this.y = F.randomInt(0, data.grid.y);
  }
}

var gameState = "start";
var snake = null;
var food = null;

function reset() {
  snake = new Snake();
  food = new Food();

  gameState = "play";
}

function render() {
  ctx.fillCanvas();

  ctx.fillStyle = "red";
  ctx.fillRect(
    food.x * (canvas.width / data.grid.x),
    food.y * (canvas.width / data.grid.y),
    canvas.width / data.grid.x,
    canvas.height / data.grid.y,
  );

  ctx.fillStyle = "lime";
  for (s = 0; s < snake.segs.length; s++) {
    ctx.fillRect(
      snake.segs[s].x * (canvas.width / data.grid.x),
      snake.segs[s].y * (canvas.width / data.grid.y),
      canvas.width / data.grid.x,
      canvas.height / data.grid.y,
    );
  }
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  /* var keysDown = F.getKeyCodes(controls); */
  if (gameState == "play") {
    
  }
}

var then = Date.now();
reset();
main();