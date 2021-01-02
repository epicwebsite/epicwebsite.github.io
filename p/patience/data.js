var data = {
  columns: 7,
  card_amount: 12,
  card_ratio: 1.5,
  card_border: 5,
  suits: {
    "D": "\u2666",
    "H": "\u2663",
    "C": "\u2665",
    "S": "\u2660",
  },
};
var color = {
  card: F.getColor([
    240,
    230,
    230,
  ]),
  card_back: F.getColor([
    50,
    120,
    200,
  ]),
  suit_red: F.getColor([
    255,
    0,
    0,
  ]),
  suit_black: F.getColor([
    0,
    0,
    0,
  ]),
  card_empty: F.getColor([
    20,
    20,
    20,
    0.5,
  ]),
};