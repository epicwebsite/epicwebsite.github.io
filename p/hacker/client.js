function goFullscreen() {
  mf = doc.body;
  mf.webkitRequestFullscreen();
}
doc.documentElement.onclick = goFullscreen;

char = 0;
var type = "beemovie";
function changeType(value) {
  if (text[value]) {
    type = value;
    clear();  
  } else {
    console.error("Does not exist");
  }
}
function clear() {
  doc.id("content").innerHTML = "";
  char = 0;
}

val = true;
addEventListener("keydown", (e) => {
  if (
    !e.ctrlKey
    && !e.altKey
    && e.code
    && e.code.sub(0, 3) == "Key"
  ) {
    goFullscreen();
    if (val) {
      val = false;
      addText();
    }
  }
});
addEventListener("keyup", () => {
  val = true;
});

function addText() {
  for (i = 0; i < F.randomInt(1, 4); i++) {
    setTimeout(() => {
      doc.id("content").innerHTML += text[type][char] == "\n" ? '<br>' : text[type][char].replace(" ", "&nbsp;");
      char++;
      if (char >= text[type].length) {
        doc.id("content").innerHTML += '<br>';
        char = 0;
      }
    }, i * (50 * (F.randomInt(5, 20) / 10)));
  }
  doc.id("content").innerHTML = doc.id("content").innerHTML.split("<br>").sub((7 - (((window.innerHeight - 30) / 20)).round()).setBorder(-Infinity, 0), -1).join("<br>");
}

doAuto = true;
async function start() {
  doAuto = true;
  while (true) {
    if (doAuto) {
      await F.sleep(F.randomInt(1, 3) / 10);
      addText();
    } else {
      break;
    }
  }
}
function stop() {
  doAuto = false;
}