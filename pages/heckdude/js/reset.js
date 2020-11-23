function reset() {
  player = new Game.Player(lvls[lvl].player);
  /* p = lvls[lvl].player;
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
  player.img = new Image(); */

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
    if (bg[data.bg.default.keys()[v]] == undefined) {
      bg[data.bg.default.keys()[v]] = data.bg.default.values()[v];
    }
  }
  for (v = 0; v < data.bg.default.cam.keys().length; v++) {
    if (b.cam[data.bg.default.cam.keys()[v]] == undefined) {
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