console.log("%c._. Hello", {
  "color": "white",
  "font-size": "25px",
}.output(":", ";"));

var ls = {};
ls.check = function () {
  if (!F.ls("settings")) {
    ls.reset();
  }
}
ls.get = function () {
  return (JSON.parse(F.ls("settings")));
}
ls.reset = function () {
  F.ls("settings", JSON.stringify({
    lightmode: false,
  }));
}
ls.edit = function (func) {
  let d = ls.get();
  func(d);
  F.ls("settings", JSON.stringify(d));
}