function init() {
  showLinks();
  ls.check();
  F.triggerOnload();
  doc.id("lightmode").checked = ls.get().lightmode;
  changeStyle();
  doc.body.style.visibility = "visible";
}
console.log("._. Hello");

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

function showLinks(showHidden) {
  doc.id("links").innerHTML = "";
  columns = 3;
  for (t = 0; t < /* links.keys().length */1; t++) {
    l = links.values()[t].items.length;
    lens = [Math.ceil(l / columns)];
    for (i = 0; i < columns - 2; i++) {
      lens.push(Math.round(l / columns));
    }
    lens.push(Math.floor(l / columns));
    console.log(lens);

    temp = [];
    total = 0;
    for (i = 0; i < lens.length; i++) {
      temp[i] = total;
      total += lens[i];
    }
    lens = temp;
    delete temp;
    console.log(lens);

    el = [
      '<section id="links_{id}">',
      '  <h2>{name}</h2>',
      '</section>',
      '<hr>',
    ].join("").format({
      id: links.keys()[t],
      name: links.values()[t].name,
    });
    $("#links").append(el);
    column = '';
    for (i = 0; i < links.values()[t].items.length; i++) {
      if (i == 0 || lens.includes(i - 1)) {
        console.log("start", i);
        column = '<column>';
      }
      if (
        links.values()[t].items[i].hidden
        && !showHidden
      ) {
        continue;
      }
      icon = icons[links.values()[t].items[i].icon];
      if (!icon) {
        icon = "";
      }
      let href = links.values()[t].items[i].id;
      if (links.values()[t].local) {
        href = "./p/{0}{1}".format(
          links.values()[t].items[i].id,
          (F.url.protocol[0] == "f") ? "/index.html" : ""
        );
      };
      let img = "";
      if (links.values()[t].image) {
        img = '<img src="{0}" class="icon_img" onerror="unloadImage(this)">'.format(
          links.values()[t].items[i].image ? links.values()[t].image.format(links.values()[t].items[i].id) : ""
        );
      }
      el = [
        '<article class="link {noImage}">',
        '  {img}',
        '  <a href="{href}" id="{id}" title="Go to: {dir}{href}">',
        '    {name}',
        '  </a>',
        '</article>',
      ].join("").format({
        img,
        noImage: !img ? "noImage" : "",
        href: href,
        dir: F.url.href,
        name: "{0}{1}".format(icon, links.values()[t].items[i].name ? links.values()[t].items[i].name : links.values()[t].items[i].id),
        id: "link_{0}".format(links.values()[t].items[i].id),
      });
      column += el;

      if (lens.includes(i + 1)) {
        console.log("end", i);
        $("#links_{0}".format(links.keys()[t])).append(column + '</column>');
      }
    }
  }
}
function showHidden() {
  showLinks(true);
}

function changeStyle() {
  doc.id("stylesheet").href = "css/{0}.css".format(doc.id("lightmode").checked ? "light" : "dark");
  ls.edit(d => {
    d.lightmode = doc.id("lightmode").checked;
  });
}

function unloadImage(el) {
  // el.style.visibility = "hidden";
  el.src = "./source/image/fallback.png";
  el.className += " unloaded";
}

function crash() {
  console.log("Look out! *crash*");
  while (true) {
    alert("You idiot!");
  }
}