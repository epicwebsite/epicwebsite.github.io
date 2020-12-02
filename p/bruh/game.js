var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var button = {
  dw: data.button.w,
  dh: data.button.h,
  pressed: false,
  img1: new Image(),
  img2: new Image(),
  val: false,
  sound: new F.Sound("audio/bruh.mp3", "audio_contain"),
};
button.img1.src = "image/button1.png";
button.img2.src = "image/button2.png";
var bg = [];
var text = {
  msg: "press for bruh".upper(),
  color: [],
  flash: true,
};

function reset() {
  bg = [
    F.randomInt(0, 360),
    100,
    60,
  ];
  text.color = [
    (bg[0] + 180).wrap(0, 360),
    80,
    80,
  ];
  text.strobe = true;
  setTimeout(() => {
    text.strobe = false;
  }, data.text.stopStrobe);

  gameState = "play";
}

function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let rgb = F.hsv_rgb(bg);
  ctx.fillCanvas(F.getColor(rgb));

  let grd = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    button.w * data.button.shine,
  );
  grd.addColorStop(0, F.getColor([255, 255, 255, 0.5]));
  grd.addColorStop(1, F.getColor([255, 255, 255, 0]));
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2,
    (canvas.height * data.button.offset) / 2,
    button.w,
    button.h,
    0, 0, 2 * Math.PI
  );
  ctx.fill();

  let fontSize = button.w * data.text.size / 100;
  ctx.font = "{0}px Impact".format(fontSize);
  ctx.textAlign = "center";
  ctx.fillStyle = F.getColor(F.hsv_rgb([
    text.color[0],
    text.color[1] - 20,
    text.color[2] - 50,
  ]));
  for (i = 0; i < data.text.d; i++) {
    ctx.fillText(
      text.msg,
      (canvas.width / 2) + i,
      (canvas.height / 10).setBorder(fontSize, canvas.height) + i,
    );
  }
  ctx.shadowColor = "black";
  ctx.strokeStyle = F.getColor([240, 240, 240, 0.6]);
  ctx.shadowBlur = 7;
  ctx.lineWidth = 3;
  ctx.strokeText(
    text.msg,
    canvas.width / 2,
    (canvas.height / 10).setBorder(fontSize, canvas.height),
  );
  ctx.shadowBlur = 0;
  ctx.fillStyle = F.getColor(F.hsv_rgb(text.color));
  ctx.fillText(
    text.msg,
    canvas.width / 2,
    (canvas.height / 10).setBorder(fontSize, canvas.height),
  );

  ctx.drawImage(
    button.pressed || button.held ? button.img1 : button.img2,
    (canvas.width / 2) - (button.w / 2),
    ((canvas.height * data.button.offset) / 2) - (button.h / 2),
    button.w,
    button.h,
  );
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  button.w = button.dw * (canvas.width / 512);
  button.h = button.dh * (canvas.width / 512);

  if (gameState == "play") {
    bg[0] += data.bg.speed / 100;
    bg[0] = bg[0].wrap(0, 360);
    if (bg[1] < 100) {
      bg[1] += data.bg.flashFade / 100;
    }
    bg[1] = bg[1].setBorder(0, 100);

    text.color[0] += text.strobe ? (data.text.strobeSpeed / 100) : (data.text.speed / 100);
    text.color[0] = text.color[0].wrap(0, 360);

    if (
      !text.strobe
      && F.diff(text.color[0], bg[0]) < 30
    ) {
      text.color[0] += 30;
    }
    
    let held = (
      (
        F.buttonDown(0)
        && F.mouse.onCanvas
        && F.collide({
          x: F.mouse.x,
          y: F.mouse.y,
          r: 1,
        }, {
          x: ((canvas.width / 2) - (button.w / 2)) + (button.w / 2),
          y: (((canvas.height * data.button.offset) / 2) - (button.h / 2)) + (button.h / 2),
          r: button.w / 2
        }, true, true)
      )
      || keysDown.includes("play")
      || F.touch.down
    );

    if (
      held
    ) {
      button.held = true;
      if (
        !button.pressed
        && (
          button.val ||
          !data.button.lift
        )
      ) {
        button.val = false;
        play();
      }
    } else {
      button.held = false;
      button.val = true;
    }
  }
}

async function play() {
  if (button.pressed) {
    button.sound = new F.Sound("audio/bruh.mp3", "audio_contain");
  }
  button.pressed = true;
  button.sound.play();
  bg[1] = (bg[1] - data.bg.flash).setBorder(0, 100);
  text.color[0] += data.text.flash;
  await F.sleep(data.button.cooldown / 1000);
  button.sound = new F.Sound("audio/bruh.mp3", "audio_contain");
  stop();
}
function stop() {
  button.pressed = false;
}
function delete_sound(el) {
  el.remove();
}

var then = Date.now();
reset();
main();