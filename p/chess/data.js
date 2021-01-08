var data = {
  pieces: [
    "pawn",
    "castle",
    "horse",
    "bishop",
    "king",
    "queen",
  ],
  moves: [
    [
      {
        x: 0,
        y: () => (a.c == 1) ? 1 : -1,
        n: 0,
      },
      {
        x: 0,
        y: () => (a.c == 1) ? 2 : -2,
        n: 0,
        e: (x, y, x2, y2, c) => {
          return ((y < 2 || y > 5)
            && !board[x][y - ((a.c == 1) ? -1 : 1)]
          );
        }
      },
      {
        x: -1,
        y: () => (a.c == 1) ? 1 : -1,
        n: 1,
      },
      {
        x: 1,
        y: () => (a.c == 1) ? 1 : -1,
        n: 1,
      },
    ],
    [
      // Rook
    ],
    [
      {
        x: -2,
        y: -1,
        n: 2,
      },
      {
        x: -1,
        y: -2,
        n: 2,
      },
      {
        x: 1,
        y: -2,
        n: 2,
      },
      {
        x: 2,
        y: -1,
        n: 2,
      },
      {
        x: -2,
        y: 1,
        n: 2,
      },
      {
        x: -1,
        y: 2,
        n: 2,
      },
      {
        x: 1,
        y: 2,
        n: 2,
      },
      {
        x: 2,
        y: 1,
        n: 2,
      },
    ],
  ],
};
var color = {
  board_white: F.getColor([
    240,
    240,
    240,
  ]),
  board_black: F.getColor([
    20,
    20,
    20,
  ]),
  board_selected: F.getColor([
    220,
    220,
    10,
  ]),
  board_selected_empty: F.getColor([
    200,
    200,
    150,
  ]),
  board_clicked: F.getColor([
    10,
    150,
    220,
  ]),
  move_available: F.getColor([
    60,
    220,
    60,
  ]),
  display_background: F.getColor([
    250,
    250,
    250,
  ]),
  display_stroke: F.getColor([
    20,
    20,
    20,
  ]),
};