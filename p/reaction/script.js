var stopper = null;
var then = null;
var lastAmount = 5;
var calc = (t) => t.setBorder(1, Infinity);
var avs = [];
var earlies = 0;

var els = {
  start: [
    '<h1>Test your Reaction Time</h1>',
    '<h2>Click or press space to continue...</h2>',
  ],
  wait: [
    '<h1>Wait...</h1>',
    '<h2>Click when it turns Green</h2>',
  ],
  early: [
    '<h1>Too early!</h1>',
    '<h2>Click or press space to continue...</h2>',
  ],
  go: [
    '<h1>CLICK NOW</h1>',
    '<h2>Hurry up!</h2>',
  ],
  success: [
    '<h1>{time}ms</h1>',
    '<h2>Click or press space to continue...</h2>',
    '<h3>',
    '  Total Average: {total}',
    '  <p></p>',
    '  Last 5 Average: {last}',
    '  <p></p>',
    '  Amount of Earlies: {earlies}',
    '</h3>',
  ],
};

doc.id("click").innerHTML = els.start.join("").format();

function start() {
  stopper = setTimeout(stop, F.randomInt(500, 1000));

  doc.id("click").setAttribute("color", "wait");
  doc.id("click").innerHTML = els.wait.join("").format();
}

async function stop() {
  if (doc.id("click").getAttribute("color") == "wait") {
    doc.id("click").setAttribute("color", "go");
    doc.id("click").innerHTML = els.go.join("").format();
    then = Date.now();
  }
}

function early() {
  doc.id("click").setAttribute("color", "early");
  doc.id("click").innerHTML = els.early.join("").format();
  stopper = null;
  earlies++;
}

function success() {
  time = calc(Date.now() - then);
  avs.push(time);
  total = 0;
  for (i = 0; i < avs.length; i++) {
    total += avs[i];
  }
  last = 0;
  for (i = 0; i < Math.min(lastAmount, avs.length); i++) {
    last += avs[avs.length - i - 1];
  }
  doc.id("click").setAttribute("color", "next");
  doc.id("click").innerHTML = els.success.join("").format({
    time,
    total: (total / avs.length).round(2),
    last: (last / Math.min(lastAmount, avs.length)).round(2),
    earlies,
  });
}

function clicked() {
  switch (doc.id("click").getAttribute("color")) {
    case ("wait"): {
      early();
    }; break;
    case ("go"): {
      success();
    }; break;
    case ("early"): {
      start();
    }; break;
    default: {
      start();
    };
  }
}

onkeydown = function (e) {
  if (e.code == "Space") {
    clicked();
  }
};

function main() {
  doc.id("click").width = window.innerWidth;
  doc.id("click").height = window.innerHeight;
  requestAnimationFrame(main);
}
main();