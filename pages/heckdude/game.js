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

function reset() {
  p = lvls[lvl].player;
  if (!p) {
    p = data.player.default;
  }
  player = {
    x: p.x,
    y: p.y,
    w: p.w,
    h: p.h,
    size: p.size,
  };
  for (v = 0; v < data.player.default.keys().length; v++) {
    if ((!player[data.player.default.keys()[v]] && player[data.player.default.keys()[v]] != 0) || player[data.player.default.keys()[v]].constructor != Number) {
      player[data.player.default.keys()[v]] = data.player.default[player.keys()[v]];
    }
  }
  if (!p.speed) {
    p.speed = data.player.default.speed;
  }
  for (v = 0; v < data.player.default.speed.keys().length; v++) {
    if ((!p.speed[data.player.default.speed.keys()[v]] && p.speed[data.player.default.speed.keys()[v]] != 0) || p.speed[data.player.default.speed.keys()[v]].constructor != Number) {
      p.speed[data.player.default.speed.keys()[v]] = data.player.default.speed.values()[v];
    }
    p.speed[p.speed.keys()[v]] *= player.size;
  }
  if (!p.vel) {
    p.vel = data.player.default.vel;
  }
  for (v = 0; v < data.player.default.vel.keys().length; v++) {
    if ((!p.vel[data.player.default.keys()[v]] && p.vel[data.player.default.keys()[v]] != 0) || p.vel[data.player.default.keys()[v]].constructor != Number) {
      p.vel[data.player.default.vel.keys()[v]] = data.player.default.vel.values()[v];
    }
  }
  player = {
    x: player.x,
    y: player.y,
    w: player.size * data.player.w,
    h: player.size * data.player.h,
    speed: p.speed,
    vel: p.vel,
  };
  player.src = "idle";
  player.img = new Image();

  b = lvls[lvl].bg;
  if (!b) {
    b = data.bg.default;
  }
  bg = {
    img: b.img,
    type: b.img,
    fallDeath: b.fallDeath,
  };
  for (v = 0; v < data.bg.default.keys().length; v++) {
    if (!bg[data.bg.default.keys()[v]] && bg[data.bg.default.keys()[v]] != 0) {
      bg[data.bg.default.keys()[v]] = data.bg.default.values()[v];
    }
  }
  for (v = 0; v < data.bg.default.cam.keys().length; v++) {
    if (!b.cam[data.bg.default.cam.keys()[v][v]] && b.cam.values()[v] != 0) {
      b.cam[data.bg.default.cam.keys()[v]] = data.bg.default.cam.values()[v];
    }
  }
  bg = {
    img: bg.img,
    type: bg.type,
    fallDeath: bg.fallDeath,
    cam: b.cam,
  };
  cam.x = 0;
  cam.y = 0;

  if (gameState != "title") {
    gameState = "level";
  }

  blocks = lvls[lvl].blocks;
  if (!blocks) {
    blocks = [];
  }
  for (b = 0; b < blocks.length; b++) {
    if (!blocks[b].type) {
      blocks[b].type = "solid";
    }
    if (!blocks[b].fill) {
      blocks[b].fill = data.blocks.types[blocks[b].type].fill;
    }
    if (!blocks[b].w && blocks[b].w != 0) {
      blocks[b].w = 100;
    }
    if (!blocks[b].h && blocks[b].h != 0) {
      blocks[b].h = 100;
    }
    if (!data.blocks.types[blocks[b].type]) {
      blocks[b].type = "solid";
    }
  }

  setTimeout(() => {
    canvas.style.visibility = "visible";
  }, 100);
}

function render() {
  ctx.fillCanvas();
  img = new Image();
  img.src = "image/bg/{0}.png".format(bg.img);
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  
  p = F.getCamPos(player, cam);
  player.img.src = "./image/player/{0}.png".format(player.src);
  if (player.flip) {
    ctx.save();
    ctx.translate(
      p.x,
      p.y,
    );
    ctx.scale(-1, 1);
    ctx.drawImage(
      player.img,
      // 0 - p.w / 2,
      0 - p.w,
      0,
      p.w,
      p.h,
    );
    ctx.restore();
  } else {
    ctx.drawImage(
      player.img,
      p.x,
      p.y,
      p.w,
      p.h,
    );
  }

  ctx.lineWidth = data.blocks.lineWidth;
  for (b = 0; b < blocks.length; b++) {
    p = F.getCamPos(blocks[b], cam);
    if (blocks[b].fill) {
      ctx.fillStyle = blocks[b].fill;
    } else {
      ctx.fillStyle = F.getColor(data.blocks.fill);
    }
    ctx.fillRect(
      p.x,
      p.y,
      p.w,
      p.h,
    );
    if (blocks[b].stroke) {
      ctx.strokeStyle = blocks[b].stroke;
      ctx.strokeRect(
        p.x,
        p.y,
        p.w,
        p.h,
      );
    }
  }

  if (gameState != "complete") {
    ctx.fillStyle = F.getColor(250);
    ctx.font = "24px Cubic";
    ctx.textAlign = "right";
    ctx.fillText(
      (lvl + 1).toString().fill(),
      canvas.width - 10,
      40,
    );
    ctx.fillStyle = F.getColor(250);
    ctx.font = "24px Cubic";
    ctx.textAlign = "left";
    ctx.fillText(
      (timer.value / 100).round(2),
      10,
      40,
    );
  }

  switch (gameState) {
    case ("title"): {
      ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));
      
      ctx.fillStyle = F.getColor(250);
      ctx.font = "48px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        egg.title ? "Heckdude v2" : "Deckhude v2",
        canvas.width / 2,
        canvas.height / 2,
      );

      ctx.fillStyle = F.getColor(170);
      ctx.font = "16px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "By Darcy",
        canvas.width / 2,
        canvas.height - 30,
      );
    }; break;
    case ("level"): {
      ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));

      ctx.fillStyle = F.getColor(250);
      ctx.font = "48px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "Level {0}".format(lvl + 1),
        canvas.width / 2,
        canvas.height / 2.3,
      );

      ctx.font = "32px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        (lvls[lvl].name ? lvls[lvl].name : "Unknown").truncate(19, "..."),
        canvas.width / 2,
        canvas.height / 1.5,
      );
    }; break;
    case ("pause"): {
      ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));

      ctx.fillStyle = F.getColor(250);
      ctx.font = "48px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "Paused",
        canvas.width / 2,
        canvas.height / 2.3,
      );

      ctx.fillStyle = F.getColor(220);
      ctx.font = "24px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ESC to continue",
        canvas.width / 2,
        canvas.height / 1.5,
      );
    }; break;
    case ("complete"): {
    ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));

    ctx.fillStyle = F.getColor(250);
    ctx.font = "48px Cubic";
    ctx.textAlign = "center";
    ctx.fillText(
      "Completed",
      canvas.width / 2,
      canvas.height / 2.3,
    );

    ctx.fillStyle = F.getColor(220);
    ctx.font = "24px Cubic";
    ctx.textAlign = "center";
    ctx.fillText(
      "Time: {0}".format((timer.value / 100).round(2)),
      canvas.width / 2,
      canvas.height / 1.5,
    );
  }; break;
}

  if (overlay.type && overlay.a > 0) {
    img = new Image();
    img.src = "./image/game/{0}-overlay.png".format(overlay.type);
    ctx.globalAlpha = overlay.a / 100;
    ctx.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    ctx.globalAlpha = 1.0;
  }

  img = new Image();
  img.src = "./image/game/overlay.png";
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
  );
}

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
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  cam.z = parseFloat(doc.id("z").value);
  thenX = player.x;
  thenY = player.y;

  switch (gameState) {
    case ("play"): {

      if (bg.cam.type == "sticky") {
        if (bg.cam.x) {
          cam.x = player.x - (canvas.width / 3);
        }
        if (bg.cam.y) {
          cam.y = player.y - (canvas.height / 3);
        }
      }

      player.flip = false;
      mult = 0;
      switch (F.boolToBin(keysDown.includes("player_right"), keysDown.includes("player_left"))) {
        case ("10"): {
          player.src = "idle_side";
          mult = 1;
        }; break;
        case ("01"): {
          player.flip = true;
          player.src = "idle_side";
          mult = -1;
        }; break;
        default: {
          player.src = "idle";
          player.vel.x -= (player.speed.move_decel * mod) * (0 - F.toOne(player.vel.x));
          if (F.diff(0, player.vel.x) <= 1) {
            player.vel.x = 0;
          }
        }
      }
      player.vel.x += (player.speed.move_acel * mod) * mult;

      if (keysDown.includes("player_up")) {
        if (player.jumpVal && val.pass) {
          player.jumpVal = false;
          player.vel.y -= player.speed.jump;
        }
      } else {
        val.pass = true;
        if (keysDown.includes("player_down")) {
          if (player.vel.y + (player.speed.drop_acel * mod) < player.speed.drop_max) {
            player.vel.y += player.speed.drop_acel;
          } else {
            player.vel.y = player.speed.drop_max;
          }
        }
      }
      if (player.vel.y <= -1) {
        player.src = "jump";
      }

      if (player.vel.y + (player.speed.fall_acel * mod) < player.speed.fall_max) {
        player.vel.y += player.speed.fall_acel * mod;
      } else {
        player.vel.y = player.speed.fall_max;
      }
      player.vel.x = player.vel.x.setBorder(0 - player.speed.move_max, player.speed.move_max);

      cb = null;
      for (b = 0; b < blocks.length; b++) {
        if (!data.blocks.types[blocks[b].type].solid) {
          continue;
        }
        if (F.collide({
          x: player.x,
          y: player.y + player.vel.y,
          w: player.w,
          h: player.h,
        }, blocks[b])) {
          cb = blocks[b];
          break;
        }
      }
      if (cb === null) {
        player.y += player.vel.y;
      } else {
        player.vel.y = 0;
      }

      cb = null;
      for (b = 0; b < blocks.length; b++) {
        if (!data.blocks.types[blocks[b].type].solid) {
          continue;
        }
        if (F.collide({
          x: player.x,
          y: player.y + player.vel.y + 1,
          w: player.w,
          h: player.h,
        }, blocks[b])) {
          cb = blocks[b];
          break;
        }
      }
      player.jumpVal = cb !== null;

      cb = null;
      for (b = 0; b < blocks.length; b++) {
        if (!data.blocks.types[blocks[b].type].solid) {
          continue;
        }
        if (F.collide({
          x: player.x + player.vel.x,
          y: player.y,
          w: player.w,
          h: player.h,
        }, blocks[b])) {
          cb = blocks[b];
          break;
        }
      }
      if (cb === null) {
        if (player.vel.x >= 1) {
          player.src = "run";
        }
        player.x += player.vel.x;
      } else {
        player.vel.x = 0;
      }

      let types = {
        solid: () => {
          player.y -= 1;
        },
        goal,
        death,
      };
      for (i = 0; i < types.keys().length; i++) {
        for (b = 0; b < blocks.length; b++) {
          if (!data.blocks.types[blocks[b].type][types.keys()[i]]) {
            continue;
          }
          if (F.collide({
            x: player.x + player.vel.x,
            y: player.y,
            w: player.w,
            h: player.h,
          }, blocks[b])) {
            types.values()[i]();
            break;
          }
        }
      }

      if (bg.fallDeath) {
        if (F.getCamPos(player, cam).y > canvas.height) {
          death();
        }
      }

      if (keysDown.includes("restart")) {
        gameState = "restart";
        reset();
        return;
      }

      if (keysDown.includes("pause")) {
        if (val.pause) {
          gameState = "pause";
          timer.stop();
          val.pause = false;
        }
      } else {
        val.pause = true;
      }
    }; break;
    case ("title"): {
      if (keysDown.includes("title_pass")) {
        if (val.pass) {
          gameState = "level";
          val.pass = false;
        }
      } else {
        val.pass = true;
      }
    }; break;
    case ("level"): {
      if (keysDown.includes("title_pass")) {
        if (val.pass) {
          gameState = "play";
          val.pass = false;
          if (lvl <= 0) {
            timer.reset();
            timer.play();
          }
        }
      } else {
        val.pass = true;
      }
    }; break;
    case ("pause"): {
      if (keysDown.includes("pause")) {
        if (val.pause) {
          gameState = "play";
          timer.play();
          val.pause = false;
        }
      } else {
        val.pause = true;
      }
    }; break;
    case ("complete"): {
      if (keysDown.includes("title_pass")) {
        if (val.pass) {
          reset();
          val.pass = false;
        }
      } else {
        val.pass = true;
      }
    }; break;
  }

  if (bg.cam.type == "dynamic") {
    if (bg.cam.x) {
      if (player.x < thenX) {
        if (F.getCamPos(player, cam).x < canvas.width / (data.bg.camMove)) {
          cam.x += player.x - thenX;
        }
      }
      if (player.x > thenX) {
        if (F.getCamPos(player, cam).x > (canvas.width / data.bg.camMove) * (data.bg.camMove - 1)) {
          cam.x += player.x - thenX;
        }
      }
    }
    if (bg.cam.y) {
      if (player.y > thenY) {
        if (F.getCamPos(player, cam).y < canvas.height / (data.bg.camMove)) {
          cam.y += player.y - thenY;
        }
      }
      if (player.y < thenY) {
        if (F.getCamPos(player, cam).y > (canvas.height / data.bg.camMove) * (data.bg.camMove - 1)) {
          cam.y += player.y - thenY;
        }
      }
    }
  }

  if (keysDown.includes("debug_main")) {
    if (F.buttonDown(0)) {
      player.x = (((F.mouse.x - (canvas.width / 2)) / (cam.z / 100)) + (canvas.width / 2)) + cam.x;
      player.y = (((F.mouse.y - (canvas.height / 2)) / (cam.z / 100)) + (canvas.height / 2)) - cam.y;
    }
  }
}

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

function showSpeed() {
  doc.id("speed").style.display = doc.id("show_speed").checked ? "block" : "none";
}

var then = Date.now();
reset();
main();