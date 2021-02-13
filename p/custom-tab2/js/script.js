/* Top */
function init() {
  ls.check();
  sc.init();
}

/* LocalStorage */
var ls = {};
ls.check = function () {
  if (!ls.get(true)) {
    ls.reset();
  }
}
ls.reset = function () {
  ls.set(() => ({
    sc: [],
  }));
  sc.reset();
}
ls.get = function (dontCheck) {
  if (!dontCheck) {
    ls.check();
  }
  return (JSON.parse(F.ls("all")));
}
ls.set = function (fnct) {
  d = ls.get(true);
  ret = fnct(d);
  if (ret) {
    F.ls("all", JSON.stringify(ret));
    return (true);
  }
  F.ls("all", JSON.stringify(d));
  return (false);
}

/* Shortcuts */
sc = {};

sc.reset = function () {
  arr = [];
  for (i = 0; i < data.shortcut_amount; i++) {
    arr.push({
      href: null,
      name: null,
    });
  }
  ls.set(d => {
    d.sc = arr;
  });
}

sc.init = function () {
  doc.id("sc_contain").innerHTML = "";
  d = ls.get();
  for (i = 0; i < data.shortcut_amount; i++) {
    href = "https://epicwebsite.github.io/";
    unknown = "unknown";
    if (d.sc[i] && d.sc[i].href) {
      href = d.sc[i].href;
      unknown = "";
    }
    name = "Shortcut";
    if (d.sc[i] && d.sc[i].name) {
      name = d.sc[i].name;
    }

    doc.id("sc_contain").innerHTML += [
      '<article class="sc {unknown}" id="sc_n{num};">',
      '  <button class="sc link">',
      '    <a href="{href}" title="Go to \'{link}\'" class="{unknown}">',
      '      {name}',
      '    </a>',
      '  </button>',
      '  <button class="sc edit" onclick="sc.edit(this)">',
      '    <i class="fa fa-edit"></i>',
      '  </button>',
      '</article>',
    ].join("").format({
      href,
      name,
      unknown,
      num: i,
    });
  }
}

sc.edit = function (el) {
  unknown = el.parentNode.className.includes("unknown");
  num = parseInt(el.parentNode.id.split("n").s(-1));
  console.log(num);
  old_href = "https://epicwebsite.github.io/"
  if (
    !unknown
    && ls.get().sc[num]
    && ls.get().sc[num].href
  ) {
    old_href = ls.get().sc[num].href;
  }
  href = prompt("Link: ", old_href);
  if (href) {
    old_name = "Shortcut"
    if (
      !unknown
      && ls.get().sc[num]
      && ls.get().sc[num].name
    ) {
      old_name = ls.get().sc[num].name;
    }
    name = prompt("Name: ", old_name);
    if (name) {
      ls.set(d => {
        d.sc[num] = {
          href,
          name,
        };
      });
      sc.init();
    }
  } else {
    ls.set(d => {
      d.sc[num] = {
        href: null,
        name: null,
      };
    });
    sc.init();
  }
}