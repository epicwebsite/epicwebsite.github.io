var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var grid = null;

function reset() {
  grid = [];
  for (x = 0; x < data.size.x; x++) {
    grid[x] = [];
    for (y = 0; y < data.size.y; y++) {
      grid[x][y] = 0;
    }
  }
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 1000; j++) {
      x = F.randomInt(0, grid.length - 1);
      y = F.randomInt(0, grid[x].length - 1);
      if (grid[x][y] == 0) {
        grid[x][y] = i + 1;
        break;
      }
    }
  }

  gameState = "play";
}

function render() {
  ctx.fillCanvas();

  ctx.lineWidth = 10;
  ctx.strokeStyle = color.stroke;
  ctx.font = "bold 80px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      ctx.fillStyle = color.empty;
      if (grid[x][y]) {
        ctx.fillStyle = color.value[grid[x][y] - 1];
      }
      ctx.fillRect(
        x * (canvas.width / grid[x].length),
        y * (canvas.height / grid[y].length),
        canvas.width / grid[x].length,
        canvas.height / grid[y].length,
      );

      ctx.strokeRect(
        x * (canvas.width / grid[x].length),
        y * (canvas.height / grid[y].length),
        canvas.width / grid[x].length,
        canvas.height / grid[y].length,
      );

      if (grid[x][y]) {
        ctx.fillStyle = color.text;
        ctx.fillText(
          2 ** grid[x][y],
          (x + 0.5) * (canvas.width / grid[x].length),
          (y + 0.5) * (canvas.height / grid[y].length),
        );
      }
    }
  }
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (gameState == "play") {
    x = 0;
    y = 0;
    switch (F.bool_bin(keysDown.includes("move_up"), keysDown.includes("move_right"), keysDown.includes("move_down"), keysDown.includes("move_left"))) {
      case "1000": {
        y = -1;
      }; break;
      case "0100": {
        x = 1;
      }; break;
      case "0010": {
        y = 1;
      }; break;
      case "0001": {
        x = -1;
      }; break;
    }
    console.log(keysDown);
  }
}

var then = Date.now();
reset();
main();