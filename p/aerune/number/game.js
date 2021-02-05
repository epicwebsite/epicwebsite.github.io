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
  
  number = doc.id("input").value;
  doc.id("decimal").value = "";
  w = 50;
  margin = 5;
  padding = 5;
  lineMax = 10;
  full = [];
  if (number || number == 0) {
    arr = number;
    temp = [];
    if (doc.id("convert").checked) {
      arr = arr.split(" ");
    }
    for (i = 0; i < arr.length; i++) {
      if (parseInt(arr[i]) == arr[i]) {
        temp.push(parseInt(arr[i]).toString(16));
      } else if (arr[i].replaceAll(" ", "").length < 1) {
        temp.push(" ");
      }
    }
    hex = temp.join("");
    delete temp;
    doc.id("decimal").value = hex.upper();
    
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (d = 0; d < hex.length; d++) {
      digit = parseInt(hex[d], 16);
      if (!digit && digit != 0) {
        continue;
      }
      line = [
        Math.floor((digit - 1) / 4) % 2,
        Math.round((digit + 2) / 2) % 2,
        (digit > 8 || digit == 0) ? 1 : 0,
        !(digit % 2) ? 1 : 0,
      ];
      full.push([Math.round((digit + 2) / 2) % 2, line]);
      x = d.wrap(-1, lineMax, true);
      y = Math.floor(d / lineMax);
      if (y >= lineMax) {
        continue;
      }
      y *= w;

      /* Diagonal */
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(
        margin + padding + (x * w),
        margin + y + (!line[0] ? w - padding : 0 + padding),
      );
      ctx.lineTo(
        margin - padding + ((x + 1) * w),
        margin + y + (line[0] ? w - padding : 0 + padding),
      );
      ctx.stroke();

      /* Secondary */
      ctx.beginPath();
      ctx.moveTo(
        margin + (x + 0.5) * w,
        margin + (w / 2) + y,
      );
      switch (F.bool_bin(line[0], line[1])) {
        case ("00"): {
          ctx.lineTo(
            margin - padding + ((x + 1) * w),
            margin - padding + w + y,
          );
        }; break;
        case ("01"): {
          ctx.lineTo(
            margin + padding + (x * w),
            margin + padding + y,
          );
        }; break;
        case ("10"): {
          ctx.lineTo(
            margin + padding + (x * w),
            margin - padding + w + y,
          );
        }; break;
        case ("11"): {
          ctx.lineTo(
            margin - padding + ((x + 1) * w),
            margin + padding + y,
          );
        }; break;
      }
      ctx.stroke();

      /* Left Line */
      if (line[2]) {
        ctx.beginPath();
        ctx.moveTo(
          margin + padding + (x * w),
          margin + padding + y,
        );
        ctx.lineTo(
          margin + padding + (x * w),
          margin - padding + y + w,
        );
        ctx.stroke();
      }

      /* Right Line */
      if (line[3]) {
        ctx.beginPath();
        ctx.moveTo(
          margin - padding + ((x + 1) * w),
          margin + padding + y,
        );
        ctx.lineTo(
          margin - padding + ((x + 1) * w),
          margin - padding + y + w,
        );
        ctx.stroke();
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

function change(el) {
  el.value = el.value.replace(/[^0-9 ]/g, '');
};
function minusNum() {
  doc.id("input").value = isNaN(parseInt(doc.id("input").value)) ? 0 : parseInt(doc.id("input").value) - 1;
}
function addNum() {
  doc.id("input").value = isNaN(parseInt(doc.id("input").value)) ? 0 : parseInt(doc.id("input").value) + 1;
}