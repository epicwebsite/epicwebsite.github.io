inEditor = true;
function editor(keysDown) {
  scene.cam.x = parseFloat(doc.id("x").value);
  scene.cam.y = parseFloat(doc.id("y").value);
  scene.cam.z = parseFloat(doc.id("z").value);

  tool = doc.id("tool").value;

  switch (tool) {
    case ("block_draw"): {
      if (F.mouse.onCanvas) {
        p = {
          x: (((F.mouse.x - (canvas.width / 2)) / (scene.cam.z / 100)) + (canvas.width / 2)) + scene.cam.x,
          y: (((F.mouse.y - (canvas.height / 2)) / (scene.cam.z / 100)) + (canvas.height / 2)) - scene.cam.y,
        };
        if (keysDown.includes("edit_draw")) {
          if (!newBlock) {
            newBlock = {
              x: p.x,
              y: p.y,
            };
          }
        } else {
          if (newBlock) {
            if (
              F.diff(p.x, newBlock.x) > 0.1
              && F.diff(p.y, newBlock.y) > 0.1
            ) {
              blocks.push({
                x: Math.min(p.x, newBlock.x),
                y: Math.min(p.y, newBlock.y),
                w: F.diff(p.x, newBlock.x),
                h: F.diff(p.y, newBlock.y),
                fill: doc.id("block_fill").value,
                stroke: doc.id("block_doStroke").checked ? doc.id("block_stroke").value : undefined,
                lineWidth: doc.id("block_line").value,
                type: "solid",
              });
              newBlock = null;
              historyUpdate();
            }
          }
        }
      }
    }; break;
    case ("player_move"): {
      if (
        keysDown.includes("edit_player_move")
        && F.mouse.onCanvas
      ) {
        player.x = (((F.mouse.x - (canvas.width / 2)) / (scene.cam.z / 100)) + (canvas.width / 2)) + scene.cam.x;
        player.y = (((F.mouse.y - (canvas.height / 2)) / (scene.cam.z / 100)) + (canvas.height / 2)) - scene.cam.y;
        historyUpdate();
      }
    }; break;
  }
  playerDef.x = player.x;
  playerDef.y = player.y;
  if (keysDown.includes("edit_undo")) {
    undo();
  }
}

function togglePlay() {
  switch (gameState) {
    case ("edit"): {
      gameState = "play";
      doc.id("playBtn").innerHTML = "Edit";
    }; break;
    default: {
      gameState = "edit";
      doc.id("playBtn").innerHTML = "Play";
    };
  }
  doc.id("playBtn").blur();
}

function changeTool() {
  els = doc.class("tooldiv");
  for (i = 0; i < els.length; i++) {
    els[i].style.display = "none";
  }
  els = doc.class(doc.id("tool").value);
  for (i = 0; i < els.length; i++) {
    els[i].style.display = "block";
  }
}

function historyUpdate() {
  console.log(1);
  if (editHistory.place > editHistory.timeline.length) {
    editHistory.timeline = editHistory.timeline.sub(0, editHistory.place);
  }
  editHistory.timeline.push({
    blocks,
    player,
    scene,
    playerDef,
    time: Date.now(),
  });
  editHistory.place++;
  // editHistory.place = editHistory.place.setBorder(0, editHistory.timeline.length);
}
function undo() {
  editHistory.place--;
  if (editHistory.place > 0) {
    blocks = editHistory.timeline[editHistory.place].blocks;
  }
  // editHistory.place = editHistory.place.setBorder(0, editHistory.timeline.length);
}

function lvlExport() {
  p = player;
  p.x = playerDef.x;
  p.y = playerDef.y;
  prompt("Copy this text!", JSON.stringify({
    name: "Editor test",
    player: p,
    scene,
    blocks,
  }));
}
function lvlImport() {
  text = prompt('Input level data!', 'Like this: {"name":"Level","player":{...');
    text = JSON.parse(text);
    player = text.player;
    playerDef = {
      x: player.x,
      y: player.y,
    };
    scene = text.scene;
    blocks = text.blocks;
}