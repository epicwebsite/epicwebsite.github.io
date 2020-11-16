function init() {
  showLinks();
  ls.check();
  F.triggerOnload();
  doc.id("lightmode").checked = ls.get().lightmode;
  changeStyle();
  doc.body.style.visibility = "visible";
}

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

function showLinks() {
  doc.id("links").innerHTML = "";
  for (i = 0; i < links.length; i++) {
    let el = [
      '<a href="{href}" class="link" id="{id}" title="Go to: {dir}{href}">{name}</a>',
      '<br>',
    ].join("").format({
      href: "pages/{0}/index.html".format(links[i].id),
      dir: F.url.dir,
      name: links[i].name ? links[i].name : links[i].id,
      id: "link_{0}".format(links[i].id),
    });
    $("#links").append(el);
  }
}

function changeStyle() {
  doc.id("stylesheet").href = "css/{0}.css".format(doc.id("lightmode").checked ? "light" : "dark");
  ls.edit(d => {
    d.lightmode = doc.id("lightmode").checked;
  });
}