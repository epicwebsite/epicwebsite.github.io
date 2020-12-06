function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  cam.x = parseFloat(doc.id("x").value);
  cam.y = parseFloat(doc.id("y").value);
  cam.z = parseFloat(doc.id("z").value);
  F.ls("cam", JSON.stringify(cam));

  if (gameState == "play") {
    selectedPlace = null;
    fl = data.shops[shop].map.floor;
    if (F.mouse.onCanvas) {
      for (b = 0; b < data.shops[shop].map.types.keys().length; b++) {
        bl = data.shops[shop].map.types.values()[b];
        p = F.getCamPos({
          x: bl.x + fl.x,
          y: bl.y + fl.y,
          w: bl.w,
          h: bl.h,
        }, cam);
        if (F.collide(p, {
          x: F.mouse.x,
          y: F.mouse.y,
          w: 1,
          h: 1,
        })) {
          selectedPlace = {
            name: data.shops[shop].map.types.keys()[b],
            x: bl.x + fl.x + (bl.w / 2),
            y: bl.y + fl.y + (bl.h / 2),
          };
          break;
        }
      }
    }
  }
}