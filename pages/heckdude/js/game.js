var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 768;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

var gameState = "title";
var lvl = 0;
var cam = {
  x: 0,
  y: 0,
  z: 100,
};
var blocks = [];
var player = {};
var egg = {
  title: F.randomInt(0, 10) != 0,
};
var bg = {};
var timer = {
  value: 0,
};
var overlay = {
  a: 0,
  type: null,
};

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}

var val = {
  pass: false,
  pause: false,
};

function goal() {
  gameState = "goal";
  overlay.a = 0;
  overlay.type = "goal";
  F.interval("goal_fadeOut", (i, m) => {
    overlay.a = i * (100 / m);
  }, 50, 1, () => {
    lvl++;
    val.pass = false;
    if (lvl >= lvls.length) {
      timer.stop();
      complete();
    } else {
      reset();
    }
    overlay.a = 100;
    setTimeout(() => {
      F.interval("goal_fadeIn", (i, m) => {
        overlay.a = 100 - (i * (100 / m));
      }, 30, 1, () => {
        overlay.a = 0;
      });
    }, 80);
  });
}

function death() {
  gameState = "death";
  overlay.a = 100;
  overlay.type = "death";
  reset();
  val.pass = false;
  setTimeout(() => {
    F.interval("death_fade", (i, m) => {
      overlay.a = 100 - (i * (100 / m));
    }, 100, 1, () => {
      overlay.a = 0;
    });
  }, 200);
}

function complete() {
  gameState = "complete";
  lvl = 0;
  console.log("Completed in {0}s".format((timer.value / 100).round(2)));
}

timer.play = function () {
  timer.stop();
  timer.updater = setInterval(timer.update, 10);
  timer.setLast();
}
timer.update = function () {
  timer.value += data.timer.unfocused ? (Date.now() - timer.last) / 10 : 1;
  timer.setLast();
}
timer.stop = function () {
  clearInterval(timer.updater);
  timer.setLast();
}
timer.reset = function () {
  timer.value = 0;
  timer.setLast();
}
timer.last = 0;
timer.setLast = function () {
  timer.last = Date.now();
}

var then = Date.now();
reset();
main();