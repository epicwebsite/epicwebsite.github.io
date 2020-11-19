
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  cam.z = parseFloat(doc.id("z").value);
  thenX = player.x + (player.w / 2);
  thenY = player.y + (player.h / 2);

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
          x: player.x + 1,
          y: player.y + player.vel.y + 1,
          w: player.w - 2,
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
      main: for (i = 0; i < types.keys().length; i++) {
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
            break main;
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
      x = player.x + (player.w / 2);
      y = player.y + (player.h / 2);
      if (x < thenX) {
        if (F.getCamPos({
          x,
          y,
        }, cam).x < canvas.width / data.bg.camMove) {
          cam.x += x - thenX;
        }
      }
      if (x > thenX) {
        if (F.getCamPos({
          x,
          y,
        }, cam).x > (canvas.width / data.bg.camMove) * (data.bg.camMove - 1)) {
          cam.x += x - thenX;
        }
      }
    }
    if (bg.cam.y) {
      if (y > thenY) {
        if (F.getCamPos({
          x,
          y,
        }, cam).y < canvas.height / data.bg.camMove) {
          cam.y += y - thenY;
        }
      }
      if (y < thenY) {
        if (F.getCamPos({
          x,
          y,
        }, cam).y > (canvas.height / data.bg.camMove) * (data.bg.camMove - 1)) {
          cam.y += y - thenY;
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