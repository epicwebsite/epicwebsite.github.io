var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var cards = {};

function reset() {
  cards = {
    table: [],
    deck: {},
    aces: [],
    selected: null,
  };
  for (i = 0; i < data.columns; i++) {
    if (i == 2) {
      cards.table.push({
        down: [],
        up: [],
      });
      continue;
    }
    down = [];
    for (j = 0; j < i; j++) {
      down.push(randomCard());
    }
    up = [];
    for (j = 0; j < F.randomInt(0, i * 2); j++) {
      up.push(randomCard());
    }
    cards.table.push({
      down,
      up: up,
    });
  }
  for (i = 0; i < 4; i++) {
    cards.aces[i] = [];
  }

  gameState = "play";
}

function render() {
  ctx.fillCanvas();

  w = canvas.width / (data.columns + 1) - 2;
  for (c = 0; c < cards.table.length; c++) {
    if (cards.table[c].down.length < 1 && cards.table[c].up.length < 1) {
      ctx.fillStyle = color.card_empty;
      ctx.fillRoundRect(
        (c * w) + 7,
        10,
        w * 0.8,
        (w * 0.8) * data.card_ratio,
        4,
      );
    } else {
      for (i = 0; i < cards.table[c].down.length; i++) {
        ctx.fillStyle = color.card;
        ctx.fillRoundRect(
          (c * w) + 7,
          i * ((canvas.height / 2) / data.card_amount) + 10,
          w * 0.8,
          (w * 0.8) * data.card_ratio,
          4,
        );
        ctx.fillStyle = color.card_back;
        ctx.fillRoundRect(
          (c * w) + data.card_border + 7,
          (i * ((canvas.height / 2) / data.card_amount)) + data.card_border + 10,
          (w * 0.8) - (data.card_border * 2),
          ((w * 0.8) * data.card_ratio) - (data.card_border * 2),
          4,
        );
      }
      for (i = 0; i < cards.table[c].up.length; i++) {
        var gradient = ctx.createLinearGradient(0, 0, 0, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = color.card;
        ctx.fillRoundRect(
          (c * w) + 7,
          (cards.table[c].down.length + i) * ((canvas.height / 2) / data.card_amount) + 10,
          w * 0.8,
          (w * 0.8) * data.card_ratio,
          4,
        );

        suit = data.suits[cards.table[c].up[i].split("-")[1]];
        text = cards.table[c].up[i].split("-")[0] + suit;
        ctx.fillStyle = "DH".includes(cards.table[c].up[i].split("-")[1]) ? color.suit_red : color.suit_black;
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(
          text,
          c * w + 10,
          (cards.table[c].down.length + i) * ((canvas.height / 2) / data.card_amount) + 13,
        );
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(
          text,
          (c * w + 4) + (w * 0.8),
          ((cards.table[c].down.length + i) * ((canvas.height / 2) / data.card_amount) + 10) + ((w * 0.8) * data.card_ratio),
        );
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          suit,
          (c * w + 4) + ((w * 0.8) / 2),
          ((cards.table[c].down.length + i) * ((canvas.height / 2) / data.card_amount) + 10) + (((w * 0.8) * data.card_ratio) / 2),
        );
      }
    }
  }
  for (s = 0; s < cards.aces.length; s++) {
    if (cards.aces[s].length > 0) {

    } else {
      ctx.fillStyle = color.card_empty;
      ctx.fillRoundRect(
        (data.columns + 0.2) * w,
        (s * 100) + 10,
        w * 0.8,
        (w * 0.8) * data.card_ratio,
        4,
      );
    }
  }
  if (cards.selected) {
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;
    ctx.strokeRect(
      cards.selected.x,
      cards.selected.y,
      cards.selected.w,
      cards.selected.h,
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
  if (gameState == "play") {
    cards.selected = null;
    if (F.mouse.onCanvas) {
      w = canvas.width / (data.columns + 1) - 2;
      for (c = 0; c < cards.table.length; c++) {
        if (cards.table[c].up.length > 0) {
          p = {
            x: (c * w) + 7,
            y: cards.table[c].down.length * ((canvas.height / 2) / data.card_amount) + 10,
            w: w * 0.8,
            h: ((cards.table[c].up.length - 1) * ((canvas.height / 2) / data.card_amount)) + ((w * 0.8) * data.card_ratio),
            type: "d-{0}".format(c),
          };
          if (F.collide({
            x: F.mouse.x,
            y: F.mouse.y,
            w: 1,
            h: 1,
          }, p)) {
            cards.selected = p;
          }
        }
      }
    }
  }
}

var then = Date.now();
reset();
main();

function randomCard() {
  return (F.randomInt(1, 13) + "-" + F.randomChoice("DHCS".split("")));
}