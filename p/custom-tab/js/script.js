/* Top */
function init() {
  handle.startTimeout();
  handle.hide();
  ls.check();
  sc.init();
  header.init();
  // uncomment_for_error;
  handle.continue();
}


/* Error Handling */
onerror = (msg) => {
  handle.error(msg);
};
var handle = {};
handle.error = function (msg) {
  console.error(msg);
  doc.id("error_code").innerHTML += "<br>" + msg;
  handle.show();
}
handle.startTimeout = function () {
  handle.timeout = setTimeout(() => {
    handle.error("Timeout of 2000 milliseconds");
  }, 2000);
}
handle.stopTimeout = function () {
  console.log(1);
  clearInterval(handle.timeout);
}
handle.hide = function () {
  doc.id("error").style.display = "none";
}
handle.show = function () {
  doc.id("error").style.display = "block";
}
handle.continue = function () {
  handle.hide();
  doc.id("content").style.visibility = "visible";
  handle.stopTimeout();
}


/* LocalStorage */
var ls = {};

ls.check = function () {
  if (!ls.get(true)) {
    ls.reset();
  }
}

ls.reset = function () {
  ls.set(() => ({}));
  sc.reset();
  header.reset();
}

ls.get = function (dontCheck) {
  if (!dontCheck) {
    ls.check();
  }
  l = JSON.parse(F.ls("all"));
  if (F.isJSON(l)) {
    l = JSON.parse(l);
  }
  return (l);
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

ls.export = function () {
  prompt("Press CTRL+C to copy", F.ls("all"));
}
ls.import = function (str) {
  if (str) {
    if (typeof str == "string") {
      ls.set(() => str);
    } else {
      ls.set(() => JSON.stringify(str));
    }
  } else {
    text = prompt("Paste in the settings\nONLY DO THIS IF YOU KNOW WHAT YOU ARE DOING", "Example: '{\"sc\":{},\"header\":\"New-tab\"}'");
    if (text && F.isJSON(text)) {
      ls.set(() => text);
      init();
    } else {
      alert("That is not valid JSON");
    }
  }
}


/* Shortcuts */
var sc = {};

sc.reset = function () {
  ls.set(d => {
    d.sc = {};
  });
}

sc.init = function () {
  doc.id("sc_contain").innerHTML = "";
  d = ls.get();
  if (!d.sc) {
    sc.reset();
  }
  for (i = 0; i < data.shortcut_amount; i++) {
    href = "https://epicwebsite.github.io/";
    unknown = "unknown";
    if (d.sc[i] && d.sc[i].href) {
      href = d.sc[i].href;
      unknown = "";
    }
    name = "Shortcut {0}".format(i + 1);
    if (d.sc[i] && d.sc[i].name) {
      name = d.sc[i].name;
    }

    doc.id("sc_contain").innerHTML += [
      '<article class="sc {unknown}" id="sc_n{num};">',
      '  <button class="sc link">',
      '    <a href="{href}" title="Go to \'{href}\'" class="{unknown}">',
      '      {name}',
      '    </a>',
      '  </button>',
      '  <button class="sc edit" onclick="sc.edit(this)">',
      '    <i class="fa fa-edit"></i>',
      '  </button>',
      '</article>',
    ].join("").format({
      href,
      name: name.truncate(15, "..."),
      unknown,
      num: i,
    });
  }
}

sc.edit = function (el) {
  unknown = el.parentNode.className.includes("unknown");
  num = parseInt(el.parentNode.id.split("n").s(-1));
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
    if (href == "") {
      ls.set(d => {
        delete d.sc[num];
      });
      sc.init();
    }
  }
}


/* Header */
var header = {};

header.reset = function () {
  ls.set(d => {
    d.header = null;
  });
}

header.init = function () {
  text = ls.get().header ? ls.get().header : "New Tab";
  doc.id("header").innerText = text;
  doc.id("title").innerText = text;
}

header.change = function () {
  old = ls.get().header;
  if (!old) {
    header.reset();
    old = "New Tab";
  }
  text = prompt("Change Header", old);
  if (text) {
    ls.set(d => {
      d.header = text;
    });
  } else {
    if (text == "") {
      header.reset();
    }
  }
  header.init();
}


/* Search */
function search(e) {
  text = doc.id("search").value;

  if (text && text.replaceAll(" ", "")) {
    if (e.key == "Enter") {
      url = "https://www.google.com/search?q={0}".format(text);
      if (text.isURL()) {
        url = text;
      }
      if (("https://" + text).isURL()) {
        url = "https://" + text;
      }
      if (e.ctrlKey) {
        open(url, "_blank");
      } else {
        location.href = url;
      }
    }
  }
}