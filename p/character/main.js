/* var canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;
canvas.id = "canvas";
var ctx = canvas.getContext("2d"); */

function init() {
  output_gen();
  document.body.appendChild(canvas);
}
// F.c(data);
function output_clear() {
  for (i = 0; i < document.getElementById("output_table").childNodes.length; i++) {
    if (document.getElementById("output_table").childNodes[i].tagName == "TR") {
      for (i2 = 0; i2 < ((document.getElementById("output_table").childNodes[i].childNodes.length)); i2++) {
        document.getElementById("output_table").childNodes[i].removeChild(document.getElementById("output_table").childNodes[i].childNodes[i2]);
        document.getElementById("output_table").childNodes[i].removeChild(document.getElementById("output_table").childNodes[i].childNodes[i2]);
      }
    }
  }
}
var un;
function output_gen() {
  // $("<tr></tr>").insertAfter(document.getElementById("output_table").lastChild)
  for (i = 0; i < Object.keys(data).length; i++) {
    var choice = F.randomInt(1, (Object.values(data)[i].length - 1));
    var tableLine = '<tr id="output_' + Object.keys(data)[i] + '"><th>' + Object.values(data)[i][0] + '</th><td>' + Object.values(data)[i][choice] + '</td></tr>';
    $(tableLine).insertAfter(document.getElementById("output_table").lastChild)
  }
  un = "";
  var noun = nouns[F.randomInt(0, nouns.length - 1)];
  var adjective = adjectives[F.randomInt(0, adjectives.length - 1)];
  un = un + adjective[0].toUpperCase() + adjective.substring(1, adjective.length);
  addChar();
  un = un + noun[0].toUpperCase() + noun.substring(1, noun.length);
  addChar();
  for (i = 0; i < F.randomInt(0, 3); i++) {
    un = un + F.randomInt(0, 9);
  }
  var tableLine = '<tr id="output_un"><th>Username</th><td>' + un + '</td></tr>';
  $(tableLine).insertAfter(document.getElementById("output_table").lastChild);
  // drawElement();
}
function addChar() {
  var chars = ["", "", "_", "."];
  var charNum = F.randomInt(0, chars.length - 1);
  un = un + chars[charNum];
}
/* function drawElement() {
  elements = {}
  elementImgs = []
  for (i = 1; i < document.getElementById("output_table").childNodes.length; i++) {
    elements[document.getElementById("output_table").childNodes[i].firstChild.innerHTML] = document.getElementById("output_table").childNodes[i].childNodes[1].innerHTML;
    elementImgs[i] = new Image();
    elementImgs[i].src = "img/"
  }
} */