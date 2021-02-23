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
  binary = [];
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
      line = {
        left: (digit > 7) ? 1 : 0,
        right: (digit % 2) ? 1 : 0,
        second: Math.floor((digit) / 2) % 2,
        rotate: Math.abs(Math.floor((digit) / 4) % 2),
      };
      binary.push([
        line.left,
        line.rotate,
        line.second,
        line.right,
      ].join("").fill(4, "0").s(-4, -1));
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
        margin + y + (!line.rotate ? w - padding : 0 + padding),
      );
      ctx.lineTo(
        margin - padding + ((x + 1) * w),
        margin + y + (line.rotate ? w - padding : 0 + padding),
      );
      ctx.stroke();

      /* Secondary */
      ctx.beginPath();
      ctx.moveTo(
        margin + (x + 0.5) * w,
        margin + (w / 2) + y,
      );
      switch (F.bool_bin(line.rotate, line.second)) {
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

      /* Right Line */
      if (line.right) {
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

      /* Left Line */
      if (line.left) {
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
    }
  }
  doc.id("binary").innerText = binary.join(" ");
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
  if (el) {
    el.value = el.value.replace(/[^0-9 ]/g, '');
  }

  number = doc.id("input").value;
  if (number || number == 0) {
    if (number) {
      doc.id("notation").innerText = toWords(number, doc.id("convert").checked);
      doc.id("notation").href = "../letter/{0}?str={1}".format(F.url.online ? "" : "index.html", toWords(number, doc.id("convert").checked, true));
    } else {
      doc.id("notation").innerText = "";
    }
  }
};
function minusNum() {
  doc.id("input").value = isNaN(parseInt(doc.id("input").value)) ? 0 : parseInt(doc.id("input").value) - 1;
}
function addNum() {
  doc.id("input").value = isNaN(parseInt(doc.id("input").value)) ? 0 : parseInt(doc.id("input").value) + 1;
}
change();

function toWords(s, h, p) {
  var th = ["", "kil", "meg", "gig", "ter", "pet", "ex"];
  var dg = ["zil", "on", "to", "tre", "for", "vi", "hex", "sep", "oc", "nie", "dec", "al", "tee", "ad", "et", "fe"];
  if (p) {
    th = ["", "'k'i'l'o'", "'m'e'ga'", "'g'i'ga'", "'t'e'r'uh'", "'p'e't'", "'e'k's'"];
    dg = ["'z'i'l'", "'o'n'", "'t'oa'", "'ch'r'e'", "'f'or'", "'v'ee'", "'h'e'ks'", "'s'e'p'", "'o'k'", "'n'iy'", "'d'e'k'", "'a'l'", "'t'ee'", "'a'd'", "'e't'", "'f'e'"];
  }

  s = parseInt(s)?.toString(h ? 16 : 10);
  s = s?.replace(/[\, ]/g, "");
  if (s == 0) {
    return (p ? "'z'i'l'" : "zil");
  }
  x = s.indexOf(".");
  if (x == -1) {
    x = s.length;
  }
  if (x > (th.length * 3) - 1) {
    return ("Too Big");
  }
  n = s.split("");
  for (i = 0; i < n.length; i++) {
    n[i] = parseInt(n[i], 16);
  }
  str = "";
  sk = 0;
  for (i = 0; i < x; i++) {
    if ((x - i) % 3 == 2) {
      if (n[i] != 0) {
        str += dg[n[i]];
        if ((x - i) % 3 == 2) {
          str += p ? "t'e'n' " : "ten ";
        } else {
          str += " ";
        }
        sk = 1;
      }
    } else if (n[i] != 0) {
      str += dg[n[i]];
      if ((x - i) % 3 == 0) {
        str += p ? "g'u'n'd' " : "gund ";
      } else {
        str += " "
      }
      sk = 1;
    }
    if ((x - i) % 3 == 1) {
      if (sk) {
        str += th[(x - i - 1) / 3] + " ";
      }
      sk = 0;
    }
  }

  if (x != s.length) {
    y = s.length;
    str += p ? "d'o't' " : "dot";
    for (i = x + 1; i < y; i++) {
      str += dg[n[i]] + " ";
    }
  }
  return (str.replace(/\s+/g, ' ').s(0, -2));
}