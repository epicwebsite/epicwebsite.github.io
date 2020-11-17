var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "title";
var lvl = -1;
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

function reset() {
  lvl++;

  p = lvls[lvl].player;
  if (!p) {
    p = data.player.default;
  }
  player = {
    x: p.x,
    y: p.y,
    w: p.w,
    h: p.h,
  };
  for (v = 0; v < player.keys().length; v++) {
    if ((!player.values()[v] && player.values()[v] != 0) || player.values()[v].constructor != Number) {
      player[player.keys()[v]] = data.player.default[player.keys()[v]];
    }
  }
  for (v = 0; v < p.speed.keys().length; v++) {
    if ((!p.speed.values()[v] && p.speed.values()[v] != 0) || p.speed.values()[v].constructor != Number) {
      p.speed[p.speed.keys()[v]] = data.player.default.speed[p.speed.keys()[v]];
    }
  }
  for (v = 0; v < p.vel.keys().length; v++) {
    if ((!p.vel.values()[v] && p.vel.values()[v] != 0) || p.vel.values()[v].constructor != Number) {
      p.vel[p.vel.keys()[v]] = data.player.default.vel[p.vel.keys()[v]];
    }
  }
  player = {
    x: player.x,
    y: player.y,
    w: player.w * data.player.w,
    h: player.h * data.player.h,
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
  };
  for (v = 0; v < bg.keys().length; v++) {
    if ((!bg.values()[v] && bg.values()[v] != 0) || bg.values()[v].constructor != Number) {
      bg[bg.keys()[v]] = data.bg.default[b.keys()[v]];
    }
  }
  for (v = 0; v < b.cam.keys().length; v++) {
    if ((!b.cam.values()[v] && b.cam.values()[v] != 0) || b.cam.values()[v].constructor != Number) {
      b.cam[b.cam.keys()[v]] = data.bg.default[b.cam.keys()[v]];
    }
  }
  bg = {
    img: bg.img,
    type: bg.img,
    cam: b.cam,
  };

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
  
  p = F.getCamPos(
    player,
    cam,
  );
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
      0 - p.w / 2,
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

  switch (gameState) {
    case ("title"): {
      ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));
      
      ctx.fillStyle = F.getColor(250);
      ctx.font = "48px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        egg.title ? "Heckdude v2" : "Deckhude v2",
        canvas.width / 2,
        canvas.width / 2,
      );
    }; break;
  }
}

function main() {
  render();
  update((Date.now() - then) / 1000);
  then = Date.now();
  requestAnimationFrame(main);
}

var zoomIn = true;
function update(mod) {
  var keysDown = F.getKeyCodes(controls);

  switch (gameState) {
    case ("play"): {
      els = [
        "jump",
        "fall",
        "move",
        "slow",
        "move_max",
        "fall_max",
      ];
      for (i = 0; i < els.length; i++) {
        player.speed[els[i]] = parseFloat(doc.id(els[i]).value);
      }

      cam.x = parseFloat(doc.id("x").value);
      cam.y = parseFloat(doc.id("y").value);
      cam.z = parseFloat(doc.id("z").value);

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
          player.vel.x -= (player.speed.slow * mod) * (0 - F.toOne(player.vel.x));
          if (F.diff(0, player.vel.x) <= 1) {
            player.vel.x = 0;
          }
        }
      }
      player.vel.x += (player.speed.move * mod) * mult;

      if (player.jumpVal) {
        if (keysDown.includes("player_up")) {
          player.vel.y -= player.speed.jump * mod;
          player.jumpVal = false;
        }
      }
      if (player.vel.y <= -1) {
        player.src = "jump";
      }

      if (player.vel.y + (player.speed.fall * mod) < player.speed.fall_max) {
        player.vel.y += player.speed.fall * mod;
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
        player.jumpVal = false;
      } else {
        player.vel.y = 0;
        player.jumpVal = true;
      }

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
    }; break;
    case ("title"): {
      if (keysDown.includes("title_pass")) {
        gameState = "play";
      }
    }; break;
  }

  if (keysDown.includes("debug_main")) {
    if (F.buttonDown(0)) {
      player.x = (((F.mouse.x - (canvas.width / 2)) / (cam.z / 100)) + (canvas.width / 2)) + cam.x;
      player.y = (((F.mouse.y - (canvas.height / 2)) / (cam.z / 100)) + (canvas.height / 2)) - cam.y;
    }
  }
}

var then = Date.now();
reset();
main();