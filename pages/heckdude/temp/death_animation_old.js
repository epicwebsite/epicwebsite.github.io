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