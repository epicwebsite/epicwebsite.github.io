var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var gameState = "start";
var board = [];
var selected = null;
var images = {};
var vals = {};
var turn = null;

function reset() {
  board = [];
  for (x = 0; x < 8; x++) {
    board[x] = [];
    for (y = 0; y < 8; y++) {
      board[x][y] = null;
      if (y < 2 || y > 5) {
        board[x][y] = {
          c: (y < 4) ? 1 : 0,
          p: (
            y == 1 || y == 6
          ) ? 0 : (
            x == 0 || x == 7
          ) ? 1 : (
            x == 1 || x == 6
          ) ? 2 : (
            x == 2 || x == 5
          ) ? 3 : (
            x == 3
          ) ? 4 : (
            x == 4
          ) ? 5 : -1
        };
      }
    }
  }
  /* board[4][1] = {
    c: 0,
    p: 2,
  };
  board[6][0] = {
    c: 0,
    p: 2,
  };
  board[4][6] = {
    c: 0,
    p: 2,
  };
  board[4][3] = {
    c: 0,
    p: 0,
  };
  board[5][4] = {
    c: 1,
    p: 2,
  };
  board[4][3] = {
    c: 0,
    p: 2,
  };
  board[3][0] = {
    c: 0,
    p: 1,
  }; */

  for (p = 0; p < data.pieces.length; p++) {
    img = new Image();
    img.src = "./image/icon/{0}.png".format(data.pieces[p]);
    images[data.pieces[p]] = img;
  }

  gameState = "play";
  turn = 0;
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
      if (!selected || !selected.clicked) {
        selected = null;
        x = (F.mouse.x / 64).round(0, "f").setBorder(0, 8);
        y = (F.mouse.y / 64).round(0, "f").setBorder(0, 8);
        p = null;
        c = null;
        if (board[x] && board[x][y]) {
          p = board[x][y].p;
          c = board[x][y].c;
        }
        selected = {
          x,
          y,
          p,
          c,
        };
      }

      if (selected && selected.clicked) {
        canvas.style.cursor = "default";
        moves = availableMoves();
        for (m = 0; m < moves.length; m++) {
          if (
            (F.mouse.x / 64).round(0, "f").setBorder(0, 8) == moves[m].x
            && (F.mouse.y / 64).round(0, "f").setBorder(0, 8) == moves[m].y
          ) {
            canvas.style.cursor = "pointer";
            break;
          }
        }

        if (F.buttonDown(0)) {
          if (vals.click) {
            vals.click = false;
            selected.clicked = false;

            moves = availableMoves();
            for (m = 0; m < moves.length; m++) {
              if (
                (F.mouse.x / 64).round(0, "f").setBorder(0, 8) == moves[m].x
                && (F.mouse.y / 64).round(0, "f").setBorder(0, 8) == moves[m].y
              ) {
                board[moves[m].x][moves[m].y] = board[selected.x][selected.y];
                board[selected.x][selected.y] = null;
                turn = (turn + 1) % 2

                break;
              }
            }
          }
        } else {
          vals.click = true;
        }
      } else {
        canvas.style.cursor = "pointer";
        if (F.buttonDown(0)) {
          if (vals.click) {
            vals.click = false;
            if (board[selected.x][selected.y] && board[selected.x][selected.y].c == turn) {
              selected.clicked = true;
            }
          }
        } else {
          vals.click = true;
        }
      }
    }
  }
}

function availableMoves() {
  a = selected;
  if (a) {
    moves = [];

    if (data.moves[a.p]) {
      for (m = 0; m < data.moves[a.p].length; m++) {
        x = data.moves[a.p][m].x;
        if (typeof x == "function") {
          x = x();
        }
        y = data.moves[a.p][m].y;
        if (typeof y == "function") {
          y = y();
        }

        if (
          board[a.x + x] !== undefined
          && board[a.x + x][a.y + y] !== undefined
          && (
            (
              data.moves[a.p][m].n == 2
              && (
                !board[a.x + x][a.y + y]
                || board[a.x + x][a.y + y].c != a.c
              )
            ) || (
              data.moves[a.p][m].n && !(
                !board[a.x + x][a.y + y]
                || board[a.x + x][a.y + y].c == a.c
              )
            ) || (
              !data.moves[a.p][m].n && (
                !board[a.x + x][a.y + y]
              )
            )
          ) && (
            !data.moves[a.p][m].e
            || data.moves[a.p][m].e(
              a.x,
              a.y,
              a.x + x,
              a.y + y,
              board[a.x + x][a.y + y],
            )
          )
        ) {
          moves.push({
            x: a.x + x,
            y: a.y + y,
          });
        }
      }
    }

    return (moves);
  }
}

var then = Date.now();
reset();
main();