function goFullscreen() {
  mf = doc.body;
  mf.webkitRequestFullscreen();
}
doc.documentElement.onclick = goFullscreen;
doc.onkeydown = goFullscreen;

char = 0;
val = true;
addEventListener("keydown", () => {
  if (val) {
    val = false;
    addText();
  }
});
addEventListener("keyup", () => {
  val = true;
});

function addText() {
  for (i = 0; i < F.randomInt(2, 5); i++) {
    setTimeout(() => {
      doc.id("content").innerHTML += text[char] == "\n" ? '<br>' : text[char].replace(" ", "&nbsp;");
      char++;
      if (char >= text.length) {
        doc.id("content").innerHTML += '<br><br>';
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