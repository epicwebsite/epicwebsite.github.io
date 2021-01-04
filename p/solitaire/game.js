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
  deck = [];
  for (s = 0; s < 4; s++) {
    for (v = 1; v < 14; v++) {
      deck.push("{0}-{1}".format(
        v,
        "DHSC"[s],
      ));
    }
  }
  deck = deck.shuffle();
  n = 0;
  for (c = 0; c < data.columns; c++) {
    down = [];
    for (j = 0; j < c; j++) {
      down.push(deck[n]);
      n++
    }
    up = [deck[n]];
    n++;
    if (c == 0) {
      up = ["5-D", "4-C", "3-D", "2-S", "1-H"];
    }
    if (c == 1) {
      up = ["6-C"];
    }
    if (c == 2) {
      up = ["5-H"];
    }
    if (c == 3) {
      up = ["4-S"];
    }
    if (c == 4) {
      up = ["3-D"];
    }
    if (c == 5) {
      up = ["2-C"];
    }
    cards.table.push({
      down,
      up,
    });
  }
  for (i = 0; i < 4; i++) {
    cards.aces[i] = [];
    if (i == 2) {
      cards.aces[i] = ["1-S"];
    }
  }

  gameState = "play";
}

function render() {
  ctx.fillCanvas(color.background);

  width = canvas.width / (data.columns + 1) - 2;
  for (c = 0; c < cards.table.length; c++) {
    drawCard(
      (c * width) + 7,
      10,
      null,
      2,
    );
    if (!(cards.table[c].down.length < 1 && cards.table[c].up.length < 1)) {
      for (i = 0; i < cards.table[c].down.length; i++) {
        drawCard(
          (c * width) + 7,
          i * ((canvas.height / 2) / data.card_amount) + 10,
          null,
          true,
        );
      }
      for (i = 0; i < cards.table[c].up.length; i++) {
        if (
          F.buttonDown(0)
          && cards.selected
          && cards.selected.stack
          && cards.selected.stack.split("-")[0] == "t"
          && parseInt(cards.selected.stack.split("-")[1]) == c
          && cards.table[c].up.length - parseInt(cards.selected.stack.split("-")[2]) <= i
        ) {
          continue;
        }

        drawCard(
          (c * width) + 7,
          (cards.table[c].down.length + i) * ((canvas.height / 2) / data.card_amount) + 10,
          cards.table[c].up[i],
        );
      }
    }
  }
  for (c = 0; c < cards.aces.length; c++) {
    drawCard(
      (data.columns + 0.2) * width,
      (c * 100) + 10,
      null,
      2,
    );
    if (cards.aces[c].length > 0) {
      drawCard(
        (data.columns + 0.2) * width,
        (c * 100) + 10,
        cards.aces[c].sub(-1),
      );
    }
  }

  if (cards.selected) {
    if (!F.buttonDown(0)) {
      ctx.strokeStyle = color.card_hover;
      ctx.lineWidth = 4;
      ctx.strokeRoundRect(
        cards.selected.x,
        cards.selected.y,
        cards.selected.w,
        cards.selected.h,
        4,
      );
    } else {
      if (cards.selected.stack) {
        if (cards.selected.stack.split("-")[0] == "t") {
          w = canvas.width / (data.columns + 1) - 2;
          c = parseInt(cards.selected.stack.split("-")[1]);

          if (F.mouse.x < w * data.columns) {
            ctx.fillStyle = color.card_drop;
            x = ((F.mouse.x - cards.selected.rx) / (canvas.width / (data.columns + 1) - 2)).round().setBorder(0, data.columns - 1);
            ctx.fillRoundRect(
              x * (canvas.width / (data.columns + 1) - 2) + 7,
              (cards.table[x].down.length + (cards.table[x].up.length - ((x == cards.selected.stack.split("-")[1]) ? parseInt(cards.selected.stack.split("-")[2]) : 0))) * ((canvas.height / 2) / data.card_amount) + 10,
              w * 0.8,
              ((w * 0.8) * data.card_ratio) + (parseInt(cards.selected.stack.split("-")[2] - 1) * ((canvas.height / 2) / data.card_amount)),
              4,
            );
          } else {
            drawCard(
              (data.columns + 0.2) * w,
              (((F.mouse.y - cards.selected.ry) / ((cards.aces.length * 100) / 4)) + 0.5).round().setBorder(0, cards.aces.length - 1) * ((cards.aces.length * 100) / 4) + 10,
              null,
              3,
            );
          }

          for (i = cards.table[c].up.length - parseInt(cards.selected.stack.split("-")[2]); i < cards.table[c].up.length; i++) {
            drawCard(
              F.mouse.x - cards.selected.rx,
              (F.mouse.y - cards.selected.ry) + (i * ((canvas.height / 2) / data.card_amount) - 10),
              cards.table[c].up[i],
            );
          }
        }
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
  if (gameState == "play") {
    if (F.mouse.onCanvas) {
      if (cards.selected && cards.selected.stack) {
        if (cards.selected.stack.split("-")[0] == "t") {
          if (!F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              x1 = parseInt(cards.selected.stack.split("-")[1]);
              c1 = cards.table[x1].up[cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2])].split("-");
              if (F.mouse.x < (canvas.width / (data.columns + 1) - 2) * data.columns) {
                x2 = ((F.mouse.x - cards.selected.rx) / (canvas.width / (data.columns + 1) - 2)).round().setBorder(0, data.columns - 1);
                c2 = cards.table[x2].up.sub(-1);
                if (c2) {
                  c2 = c2.split("-");
                }

                if (
                  (
                    cards.table[x2].up.length == 0
                    && cards.table[x2].down.length == 0
                    && c1[0] == 13
                  )
                  || (
                    c2
                    && F.operate.logic.xor(
                      "DH".split("").includes(c1[1]),
                      "DH".split("").includes(c2[1]),
                    )
                    && parseInt(c2[0]) - 1 == c1[0]
                  )
                ) {
                  cards.table[x2].up = F.joinArray(cards.table[x2].up, F.toArray(cards.table[x1].up.sub(cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2]), -1)));
                  cards.table[x1].up = cards.table[x1].up.sub(0, cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2]));
                  if (cards.table[x1].up == undefined) {
                    cards.table[x1].up = [];
                  }
                }
              } else {
                x2 = (((F.mouse.y - cards.selected.ry) / (((cards.aces.length * 100) / 4))) + 0.5).round().setBorder(0, cards.aces.length - 1);
                c2 = cards.aces[x2].sub(-1);
                if (c2) {
                  c2 = c2.split("-");
                }

                if (
                  (
                    cards.aces[x2].length == 0
                    && c1[0] == 1
                  )
                  || (
                    c2
                    && c1[1] == c2[1]
                    && parseInt(c2[0]) + 1 == c1[0]
                  )
                ) {
                  cards.aces[x2] = F.joinArray(cards.aces[x2], F.toArray(cards.table[x1].up.sub(cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2]), -1)));
                  cards.table[x1].up = cards.table[x1].up.sub(0, cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2]));
                  if (cards.table[x1].up == undefined) {
                    cards.table[x1].up = [];
                  }
                }
              }
            }
          } else {
            cards.drop = true;
          }
        } else if (cards.selected.stack.split("-")[0] == "a") {
          if (!F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              y1 = parseInt(cards.selected.stack.split("-")[1]);
              c1 = cards.table[y1].up[0].split("-");
              y2 = ((F.mouse.y - cards.selected.ry) / (((cards.aces.length * 100) / 4))).round().setBorder(0, cards.aces.length - 1);
              c2 = cards.table[y2].up.sub(-1);
              if (c2) {
                c2 = c2.split("-");
              }
              console.log(y1, y2);/* 

              if (
                (
                  cards.table[x2].up.length == 0
                  && c1[0] == 13
                )
                || (
                  c2
                  && F.operate.logic.xor(
                    "DH".split("").includes(c1[1]),
                    "DH".split("").includes(c2[1]),
                  )
                  && (parseInt(c2[0]) - 1) == c1[0]
                )
              ) {
                cards.table[x2].up = F.joinArray(cards.table[x2].up, cards.table[x1].up);
                cards.table[x1].up = [];
              } */
            }
          } else {
            cards.drop = true;
          }
        } else if (cards.selected.stack.split("-")[0] == "f") {
          if (F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              c = parseInt(cards.selected.stack.split("-")[1]);
              cards.table[c].up.push(cards.table[c].down.sub(-1));
              cards.table[c].down = cards.table[c].down.length > 1 ? F.toArray(cards.table[c].down.sub(0, -2)) : [];
            }
          } else {
            cards.drop = true;
          }
        }
      }

      if (!F.buttonDown(0)) {
        cards.selected = null;
        w = canvas.width / (data.columns + 1) - 2;
        Columns: for (c = 0; c < cards.table.length; c++) {
          if (cards.table[c].up.length > 0) {
            for (i = cards.table[c].up.length - 1; i >= 0; i--) {
              p = {
                x: (c * w) + 7,
                y: (cards.table[c].down.length + i) * ((canvas.height / 2) / data.card_amount) + 10,
                w: w * 0.8,
                h: (((cards.table[c].up.length - i) - 1) * ((canvas.height / 2) / data.card_amount)) + ((w * 0.8) * data.card_ratio),
                stack: "t-{0}-{1}".format(c, (cards.table[c].up.length - i)),
                rx: F.diff((c * w) + 7, F.mouse.x),
                ry: F.diff(cards.table[c].down.length * ((canvas.height / 2) / data.card_amount), F.mouse.y) - 10,
              };
              if (F.collide({
                x: F.mouse.x,
                y: F.mouse.y,
                w: 1,
                h: 1,
              }, p)) {
                cards.selected = p;
                break Columns;
              }
            }
          } else if (cards.table[c].down.length > 0) {
            p = {
              x: (c * w) + 7,
              y: (cards.table[c].down.length - 1) * ((canvas.height / 2) / data.card_amount) + 10,
              w: w * 0.8,
              h: (w * 0.8) * data.card_ratio,
              stack: "f-{0}".format(c),
              rx: F.diff((c * w) + 7, F.mouse.x),
              ry: F.diff(cards.table[c].down.length * ((canvas.height / 2) / data.card_amount), F.mouse.y) - 10,
            };
            if (F.collide({
              x: F.mouse.x,
              y: F.mouse.y,
              w: 1,
              h: 1,
            }, p)) {
              cards.selected = p;
              break Columns;
            }
          }
        }
        Stacks: for (c = 0; c < cards.aces.length; c++) {
          if (cards.aces[c].length > 0) {
            p = {
              x: (data.columns + 0.2) * w,
              y: (c * 100) + 10,
              w: w * 0.8,
              h: (w * 0.8) * data.card_ratio,
              stack: "a-{0}".format(c),
              rx: F.diff((c * w) + 7, F.mouse.x),
              ry: F.diff(cards.aces[c].length * ((canvas.height / 2) / data.card_amount), F.mouse.y) - 10,
            };
            if (F.collide({
              x: F.mouse.x,
              y: F.mouse.y,
              w: 1,
              h: 1,
            }, p)) {
              cards.selected = p;
              break Stacks;
            }
          }
        }
      }
    }
    canvas.style.cursor = cards.selected ? "pointer" : "default";
  }
}

var then = Date.now();
reset();
main();

function drawCard(x, y, card, style) {
  w = (canvas.width / (data.columns + 1) - 2) * 0.8;
  h = w * data.card_ratio;
  if (style == 1) {
    // Upside down card
    ctx.fillStyle = color.card;
    ctx.fillRoundRect(
      x,
      y,
      w,
      h,
      4,
    );
    ctx.fillStyle = color.card_back;
    ctx.fillRoundRect(
      x + data.card_border,
      y + data.card_border,
      w - (data.card_border * 2),
      h - (data.card_border * 2),
      4,
    );
  } else if (style == 2) {
    // Empty card slot
    ctx.fillStyle = color.card_empty;
    ctx.fillRoundRect(
      x,
      y,
      w,
      h,
      4,
    );
  } else if (style == 3) {
    // Predicted card drop
    ctx.fillStyle = color.card_drop;
    ctx.fillRoundRect(
      x,
      y,
      w,
      h,
      4,
    );
  } else {
    // Normal card
    ctx.fillStyle = color.card_outline;
    ctx.fillRoundRect(
      x,
      y,
      w,
      h,
      4,
    );
    ctx.fillStyle = color.card;
    ctx.fillRoundRect(
      x + data.card_outline,
      y + data.card_outline,
      w - (data.card_outline * 2),
      h - (data.card_outline * 2  ),
      4,
    );

    suit = data.suits[card.split("-")[1]];
    value = data.values[card.split("-")[0]];
    ctx.fillStyle = "DH".includes(card.split("-")[1]) ? color.suit_red : color.suit_black;
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(
      value,
      x + 3,
      y + 3,
    );

    ctx.font = "bold 18px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(
      suit,
      x + w - 13,
      y,
    );

    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      suit,
      x + (w / 2),
      y + (h / 2),
    );
  }
}