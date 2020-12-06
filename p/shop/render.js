function render() {
  ctx.fillCanvas();
  
  ctx.save();
  ctx.translate(
    (((0 - cam.x) - (canvas.width / 2)) * (cam.z / 100)) + (canvas.width / 2),
    (((0 - cam.y) - (canvas.width / 2)) * (cam.z / 100)) + (canvas.width / 2),
  )
  ctx.scale(
    cam.z / 100,
    cam.z / 100,
  );

  ctx.fillStyle = F.getColor(100);
  fl = data.shops[shop].map.floor;
  ctx.fillRect(
    fl.x,
    fl.y,
    fl.w,
    fl.h,
  );
  
  ctx.fillStyle = F.getColor(240);
  ctx.strokeStyle = F.getColor(20);
  ctx.lineWidth = 2;
  for (b = 0; b < data.shops[shop].map.types.keys().length; b++) {
    bl = data.shops[shop].map.types.values()[b];
    ctx.fillRect(
      fl.x + bl.x,
      fl.y + bl.y,
      bl.w,
      bl.h,
    );
    ctx.strokeRect(
      fl.x + bl.x,
      fl.y + bl.y,
      bl.w,
      bl.h,
    );
  }

  ctx.fillStyle = F.getColor(10);
  sl = data.shops[shop].map.in;
  ctx.fillRect(
    fl.x + sl.x,
    fl.y + sl.y,
    10,
    10,
  );
  sl = data.shops[shop].map.out;
  ctx.fillRect(
    fl.x + sl.x,
    fl.y + sl.y,
    10,
    10,
  );

  if (selectedPlace) {
    ctx.font = "30pt Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    let txt = selectedPlace.name.capWords();
    w = ctx.measureText(txt).width + 10;
    h = parseInt(ctx.font) + 10;

    ctx.fillStyle = F.getColor([10, 10, 10, 0.7]);
    /* ctx.fillRect(
      selectedPlace.x - (w / 2),
      selectedPlace.y - h,
      w,
      h,
    ); */
    ctx.fillRoundRect(
      selectedPlace.x - (w / 2),
      selectedPlace.y - h,
      w,
      h,
      10,
    );

    ctx.fillStyle = F.getColor([250, 240, 240]);
    ctx.fillText(
      txt,
      selectedPlace.x,
      selectedPlace.y,
    );
  }

  ctx.restore();
}

// Delete once FnctJS uploads
CanvasRenderingContext2D.prototype.fillRoundRect = function (x, y, w, h, r) {
  if (w < 2 * r) {
    r = w / 2;
  }
  if (h < 2 * r) {
    r = h / 2;
  }
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.fill();
}