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
      
      switch (letter) {
        case "i": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.6) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "ee": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.25) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + (y + 0.75) * w,
          );
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.25) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.75) * w,
          );
          ctx.stroke();
        }; break;
        case "oo": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.stroke();
        }; break;
        case "ooh": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 0.9) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 0.9) * w,
          );
          ctx.stroke();
        }; break;
        case "e": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.8) * w,
            margin + padding + (y + 0.2) * w,
          );
          ctx.stroke();
        }; break;
        case "er": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.2) * w,
            margin - padding + (y + 0.8) * w,
          );
          ctx.stroke();
        }; break;
        case "uh": {
          ctx.beginPath();
          ctx.ellipse(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2.3) - padding,
            (w / 2.3) - padding,
            0, 0, 2 * Math.PI,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "or": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            0.5 * Math.PI,
            1.5 * Math.PI,
            true,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.85) * w,
            margin - padding + (y + 0.85) * w,
          );
          ctx.stroke();
        }; break;
        case "a": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + (x + 0.5) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "u": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.stroke();
        }; break;
        case "o": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.stroke();
        }; break;
        case "ar": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + (x + 0.35) * w,
            margin + (y + 0.65) * w,
          );
          ctx.lineTo(
            margin + (x + 0.65) * w,
            margin + (y + 0.35) * w,
          );
          ctx.stroke();
        }; break;
        case "ai": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + padding + (x + 0.25) * w,
            margin - padding + (y + 0.75) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.55) * w,
            margin - padding + (y + 0.45) * w,
          );
          ctx.stroke();
        }; break;
        case "oi": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 0.85) * w,
            margin + padding + (y + 0.15) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            0.5 * Math.PI,
            1.5 * Math.PI,
            true,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.stroke();
        }; break;
        case "iy": {
          ctx.beginPath();
          ctx.ellipse(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2.3) - padding,
            (w / 2.3) - padding,
            0, 0, 2 * Math.PI,
          );
          ctx.moveTo(
            margin + padding + (x + 0.2) * w,
            margin + (y + 0.25) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin - padding + (y + 0.9) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.8) * w,
            margin + (y + 0.25) * w,
          );
          ctx.stroke();
        }; break;
        case "air": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 0.7) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.6) * w,
          );
          ctx.lineTo(
            margin + (x + 0.35) * w,
            margin + (y + 0.6) * w,
          );
          ctx.stroke();
        }; break;
        case "ear": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.stroke();
        }; break;
        case "ooa": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.15) * w,
            margin + (y + 0.25) * w,
          );
          ctx.stroke();
        }; break;
        case "oa": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.15) * w,
            margin + (y + 0.25) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.stroke();
        }; break;
        case "ou": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + (x + 0.5) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "p": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            0.5 * Math.PI,
            1.5 * Math.PI,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.stroke();
        }; break;
        case "b": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            0.5 * Math.PI,
            1.5 * Math.PI,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "f": {
          ctx.beginPath();
          ctx.moveTo(
            margin + (x + 0.5) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.stroke();
        }; break;
        case "v": {
          ctx.beginPath();
          ctx.moveTo(
            margin + (x + 0.5) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + (x + 0.3) * w,
            margin + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin + (x + 0.7) * w,
            margin + (y + 0.7) * w,
          );
          ctx.stroke();
        }; break;
        case "th": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin + (x + 0.7) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + (x + 0.3) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.7) * w,
          );
          ctx.stroke();
        }; break;
        case "the": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin + (x + 0.7) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + (x + 0.3) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.7) * w,
          );
          ctx.moveTo(
            margin + padding + (x + 0.15) * w,
            margin - padding + (y + 0.85) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.85) * w,
            margin + padding + (y + 0.15) * w,
          );
          ctx.stroke();
        }; break;
        case "t": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.stroke();
        }; break;
        case "d": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin + (x + 0.7) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "s": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
            true,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y + 0.1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.1) * w,
          );
          ctx.stroke();
        }; break;
        case "z": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
            true,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y + 0.1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.1) * w,
          );
          ctx.moveTo(
            margin + (x + 0.5) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "sh": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
            true,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y + 0.1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.1) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.3) * w,
          );
          ctx.stroke();
        }; break;
        case "zh": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
            true,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y + 0.1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.1) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.3) * w,
          );
          ctx.moveTo(
            margin + (x + 0.5) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "ch": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.2) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.4) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.6) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.3) * w,
          );
          ctx.stroke();
        }; break;
        case "j": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.2) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.4) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.6) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.3) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y + 0.35) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.35) * w,
          );
          ctx.stroke();
        }; break;
        case "k": {
          ctx.beginPath();
          ctx.moveTo(
            margin + (x + 0.3) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.2) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + padding + (y + 0.4) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.6) * w,
          );
          ctx.lineTo(
            margin + (x + 0.3) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.stroke();
        }; break;
        case "g": {
          ctx.beginPath();
          ctx.moveTo(
            margin + (x + 0.3) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.2) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + padding + (y + 0.4) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y + 0.6) * w,
          );
          ctx.lineTo(
            margin + (x + 0.3) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + padding + (x + 0.35) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x + 0.35) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.stroke();
        }; break;
        case "m": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + padding + (y + 0.05) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.stroke();
        }; break;
        case "n": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin + padding + (y + 0.05) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "ng": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + (x + 0.5) * w,
            margin - padding + (y + 0.95) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.5) * w,
          );
          ctx.stroke();
        }; break;
        case "h": {
          ctx.beginPath();
          ctx.moveTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.3) * w,
          );
          ctx.lineTo(
            margin + (x + 0.3) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.moveTo(
            margin + (x + 0.7) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin + (y + 0.7) * w,
          );
          ctx.stroke();
        }; break;
        case "w": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + padding + (y) * w,
          );
          ctx.arc(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
            (w / 2) - padding,
            1 * Math.PI,
            0 * Math.PI,
            true,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 0.7) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin - padding + (y + 0.7) * w,
          );
          ctx.stroke();
        }; break;
        case "l": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.4) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.95) * w,
            margin + (y + 0.4) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.7) * w,
            margin + (y + 0.2) * w,
          );
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.6) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + (y + 0.6) * w,
          );
          ctx.stroke();
        }; break;
        case "r": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.95) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.7) * w,
            margin + (y + 0.3) * w,
          );
          ctx.moveTo(
            margin + (x + 0.5) * w,
            margin + (y + 0.5) * w,
          );
          ctx.lineTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.stroke();
        }; break;
        case "y": {
          ctx.beginPath();
          ctx.moveTo(
            margin + padding + (x) * w,
            margin - padding + (y + 1) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 1) * w,
            margin + padding + (y) * w,
          );
          ctx.lineTo(
            margin - padding + (x + 0.65) * w,
            margin + padding + (y) * w,
          );
          ctx.moveTo(
            margin + (x + 0.65) * w,
            margin + (y + 0.65) * w,
          );
          ctx.lineTo(
            margin + (x + 0.35) * w,
            margin + (y + 0.35) * w,
          );
          ctx.stroke();
        }; break;
      }
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