var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";

function reset() {

  gameState = "play";
}

function render() {
  ctx.fillCanvas(F.getColor(210));

  letters = doc.id("input").value;
  w = 50;
  margin = 5;
  padding = 5;
  lineMax = 10;
  if (letters && letters.length > 0) {
    letters = letters.split("/");
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (d = 0; d < letters.length; d++) {
      letter = letters[d];
      if (!letter && letter != 0) {
        continue;
      }
      x = d.wrap(-1, lineMax, true);
      y = Math.floor(d / lineMax);
      if (y >= lineMax) {
        continue;
      }

      if (doc.id("bounding").checked) {
        ctx.strokeStyle = "grey";
        ctx.strokeRect(
          margin + x * w,
          margin + y * w,
          w,
          w,
        );
        ctx.strokeStyle = "black";
      }
      
      drawLetter(letter);
    }
  }
}

function main() {
  render();
  then = Date.now();
  requestAnimationFrame(main);
}

var then = Date.now();
reset();
main();