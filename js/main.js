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
  for (t = 0; t < links.keys().length; t++) {
    el = [
      '<section id="links_{id}">',
      '<h1>{name}</h1>',
      '</section>'
    ].join("").format({
      id: links.keys()[t],
      name: links.values()[t].name,
    });
    $("#links").append(el);
    for (i = 0; i < links.values()[t].items.length; i++) {
      el = [
        '<a href="{href}" class="link" id="{id}" title="Go to: {dir}{href}">{name}</a>',
        '<br>',
      ].join("").format({
        href: "{0}/{1}{2}".format(links.keys()[t], links.values()[t].items[i].id, (F.url.protocol[0] == "f") ? "/index.html" : ""),
        dir: F.url.dir,
        name: links.values()[t].items[i].name ? links.values()[t].items[i].name : links.values()[t].items[i].id,
        id: "link_{0}".format(links.values()[t].items[i].id),
      });
      $("#links_{0}".format(links.keys()[t])).append(el);
    }
  }
}

function changeStyle() {
  doc.id("stylesheet").href = "css/{0}.css".format(doc.id("lightmode").checked ? "light" : "dark");
  ls.edit(d => {
    d.lightmode = doc.id("lightmode").checked;
  });
}