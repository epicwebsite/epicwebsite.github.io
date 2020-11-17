f = {}
f.data = {}
f.help = (func) => {
  if (func != null) {
    if (Object.keys(f).includes(func)) {
      return (f[func]);
    } else {
      return (f);
    }
  } else {
    return (f);
  }
}
f.fillStr = (str, amount, fill, reverse) => {
  if (amount == null) {
    amount = 2
  }
  if (fill == null) {
    fill = "0"
  }
  if (str.length > amount) {
    amount = str.length;
  }
  str = str + "";
  if (reverse) {
    return (str + (fill.repeat(amount - str.length)));
  }
  return ((fill.repeat(amount - str.length)) + str)
}
f.randInt = (min, max) => {
  if (min > max) {
    max = min;
  }
  if (max < min) {
    min = max;
  }
  return (Math.ceil((Math.random() * (max - min)) + min));
}
f.randChoice = (arr) => {
  return (arr[f.randInt(-1, arr.length - 1)]);
}
f.round = (num, dec) => {
  return (Math.round(num * parseInt("1" + ("0".repeat(dec)))) / parseInt("1" + ("0".repeat(dec))));
}
f.range = (min, max) => {
  if (max == null) {
    max = min;
    min = 0;
  }
  min = Math.round(min);
  max = Math.round(max);
  var otp = []
  for (i = min; i < max; i++) {
    otp.push(i);
  }
  return (otp);
}
f.collide = (r1, r2, ellipse) => {
  if (ellipse) {
    if ([null, undefined, ""].includes(r2.r)) {
      r2.r = r2.w;
    }
    var dx = Math.abs(r2.x - (r1.x + r1.w / 2));
    var dy = Math.abs(r2.y - (r1.y + r1.h / 2));
    if (dx > r2.r + r1.w / 2) {
      return ( false );
    }
    if (dy > r2.r + r1.h / 2) {
      return ( false );
    }
    if (dx <= r1.w) {
      return (true);
    }
    if (dy <= r1.h) {
      return (true);
    }
    var dx = dx - r1.w;
    var dy = dy - r1.h;
    return ( dx * dx + dy * dy <= r2.r * r2.r);
  } else {
    if (r1.x + r1.w > r2.x &&
      r1.x < r2.x + r2.w &&
      r2.y + r2.h > r1.y &&
      r2.y < r1.y + r1.h) {
      return (true);
    }
  }
  return (false);
}
f.getAngle = function (x1, y1, x2, y2, angle) {
  if (angle) {
    return ((Math.atan2((x1 - x2), (y2 - y1))) / Math.PI * 180);
  }
  return (Math.atan2((x1 - x2), (y2 - y1)));
}
f.getColor = function (arr, add, type) {
  if ([null, undefined, ""].includes(add)) {
    add = 0;
  }
  add = parseFloat(add);
  switch (type) {
    default: {
      if (arr.length >= 4) {
        return ("rgba({0}, {1}, {2}, {3})".format(arr[0] + add, arr[1] + add, arr[2] + add, arr[3]));
      } else {
        return ("rgb({0}, {1}, {2})".format(arr.addAll(add)));
      }
    }
  }
}
f.loadScript = (src, id, head) => {
  if (id == null) {
    id = src.split("/");
    id = id[id.length - 1];
    id = id.split(".");
    id = id.slice(0, id.length - 1);
    id = id.join(".");
  }
  if (document.getElementById("script_" + id)) {
    document.body.removeChild(document.getElementById("script_" + id));
  }
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = "script_" + id
  script.src = src;
  if (head) {
    document.body.append(script);
  } else {
    document.getElementsByTagName("head")[0].append(script);
  };
}
f.data.isType = {
  typeCodes: {
    "int": [
      "i",
      "integer"
    ],
    "float": [
      "f"
    ],
    "str": [
      "s",
      "string"
    ]
  },
  defType: "int"
}
f.isType = (variable, type) => {
  if (type == null) {
    type = f.data.isType.defType;
  }
  typeCodes = f.data.isType.typeCodes;
  for (i = 0; i < Object.keys(typeCodes).length; i++) {
    if (Object.values(typeCodes)[i].includes(type)) {
      type = Object.keys(typeCodes)[i];
    }
  }
  if (type == "int") {
    if (variable == parseInt(variable)) {
      return (true)
    }
    return (false)
  } else if (type == "float") {
    if (variable == parseFloat(variable)) {
      return (true)
    }
    return (false)
  } else if (type == "str") {
    if (variable == variable.toString()) {
      return (true);
    }
    return (false);
  } else {
    return (NaN);
  }
}
f.getSelectedOption = (elementId) => {
  if (document.getElementById(elementId) != null) {
    for (i = 0; i < document.getElementById(elementId).childElementCount * 2; i++) {
      if (document.getElementById(elementId).childNodes[i].tagName == "OPTION") {
        if (document.getElementById(elementId).childNodes[i].selected == true) {
          return (document.getElementById(elementId).childNodes[i]);
        }
      }
    }
  }
  return (null);
}
f.hex_rgb = (hex) => {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return ({
      r: (c >> 16) & 255, 
      g: (c >> 8) & 255, 
      b: c & 255
    });
  }
  console.error("Inbuilt error: invalid hex code: {0}".format(hex));
}
f.hex_hsv = function (hex) {
  h = f.hex_rgb(hex);
  return (f.rgb_hsv(h.r, h.g, h.b));
}
f.componentToHex = (c) => {
  var hex = c.toString(16);
  return (hex.length == 1 ? "0" + hex : hex);
}
f.rgb_hex = (r, g, b) => {
  return ("#" + f.componentToHex(r) + f.componentToHex(g) + f.componentToHex(b));
}
f.rgb_hsv = (r, g, b) => {
  var v = Math.max(r, g, b), n = v - Math.min(r, g, b);
  var h = n && ((v == r) ? (g - b) / n : ((v == g) ? 2 + (b - r) / n : 4 + (r - g) / n)); 
  return ({
    h: Math.round(60 * (h < 0 ? h + 6 : h)), 
    s: Math.round(v && n / v), 
    v: Math.round(v)
  });
}
f.hsv_rgb = (h, s, v) => {
  h = h / 360;
  s = s / 100;
  v = v / 100;
  var var_h = h * 6;
  if (var_h == 6) var_h = 0;
  var var_i = Math.floor(var_h);
  var var_1 = v * (1 - s);
  var var_2 = v * (1 - s * (var_h - var_i));
  var var_3 = v * (1 - s * (1 - (var_h - var_i)));
  if (var_i == 0) {
    var_r = v;
    var_g = var_3;
    var_b = var_1;
  } else if (var_i == 1) {
    var_r = var_2;
    var_g = v;
    var_b = var_1;
  } else if (var_i == 2) {
    var_r = var_1;
    var_g = v;
    var_b = var_3
  } else if (var_i == 3) {
    var_r = var_1;
    var_g = var_2;
    var_b = v;
  } else if (var_i == 4) {
    var_r = var_3;
    var_g = var_1;
    var_b = v;
  } else {
    var_r = v;
    var_g = var_1;
    var_b = var_2
  }
  return {
    r: Math.round(var_r * 255),
    g: Math.round(var_g * 255),
    b: Math.round(var_b * 255)
  };
};
f.keysDown = {};
f.keySeq = [];
addEventListener("keydown", function (e) {
  f.keysDown[e.keyCode] = true;
  f.keySeq.push(e.keyCode);
  if (f.keySeq.length >= 100) {
    f.keySeq.shift(0);
  }
}, false);
addEventListener("keyup", function (e) {
  delete f.keysDown[e.keyCode];
}, false);
f.keyDown = (keys = []) => {
  if (Object.keys(f.keysDown).includes(keys + "")) {
    return (true);
  }
  for (i4 = 0; i4 < keys.length; i4++) {
    if (Object.keys(f.keysDown).includes(keys[i4] + "")) {
      return (true);
    }
  }
  return (false);
}
f.getKeyCodes = (data) => {
  var keys = [];
  for (i = 0; i < data.keys.keys().length; i++) {
    var val = false;
    for (i2 = 0; i2 < data.keys.values()[i].length; i2++) {
      if (f.keyDown(data.keys.values()[i][i2])) {
        val = true;
      }
    }
    if (val && !(keys.includes(data.keys.keys()[i]))) {
      keys.push(data.keys.keys()[i]);
    } else {
      keys = keys.remove(data.keys.keys()[i]);
    }
  }
  for (i = 0; i < data.buttons.keys().length; i++) {
    var val = false;
    for (i2 = 0; i2 < data.buttons.values()[i].length; i2++) {
      if (f.buttonDown(data.buttons.values()[i][i2])) {
        val = true;
      }
    }
    if (val && ! (keys.includes(data.buttons.keys()[i]))) {
      keys.push(data.buttons.keys()[i]);
    } else {
      keys = keys.remove(data.buttons.keys()[i]);
    }
  }
  return (keys);
}
f.buttonsDown = {};
addEventListener("mousedown", function (e) {
  f.buttonsDown[e.button] = true;
}, false)
addEventListener("mouseup", function (e) {
  delete f.buttonsDown[e.button];
}, false)
f.buttonDown = (buttons = []) => {
  if (Object.keys(f.buttonsDown).includes(buttons + "")) {
    return (true);
  }
  for (i4 = 0; i4 < buttons.length; i4++) {
    if (Object.keys(f.buttonsDown).includes(buttons[i4] + "")) {
      return (true);
    }
  }
  return (false);
}
f.mouse = {
  x: null,
  y: null,
};
f.getMousePos = (e) => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
}
f.mouseOnCanvas = function (e) {
  if (doc.tag("canvas").length >= 1) {
    f.rect = doc.tag("canvas")[0].getBoundingClientRect();
    if (e.clientX >= f.rect.left &&
      e.clientY >= f.rect.top &&
      e.clientX <= (doc.tag("canvas")[0].width + (f.rect.left)) && 
      e.clientY <= (doc.tag("canvas")[0].height + (f.rect.top))) {
      return(true);
    }
  }
  return(false);
}
addEventListener("mousemove", function (e) {
  f.mouse = f.getMousePos(e);
  f.mouse.onCanvas = f.mouseOnCanvas(e);
})
f.scroll = null;
f.scrollTimer;
addEventListener("mousewheel", function (e) {
  clearTimeout(f.scrollTimer);
  if (f.toPos(e.deltaY) > f.toPos(e.deltaX)) {
    if (e.deltaY > 0) {
      f.scroll = "+y";
    } else if (e.deltaY < 0) {
      f.scroll = "-y";
    }
  } else {
    if (e.deltaX > 0) {
      f.scroll = "-x";
    } else if (e.deltaX < 0) {
      f.scroll = "+x";
    }
  }
  f.scrollTimer = setTimeout(() => {
    f.scroll = null;
  }, 1);
});
f.diff = (n1, n2) => {
  if (n1 > n2) {
    return (n1 - n2);
  }
  if (n2 > n1) {
    return (n2 - n1)
  }
  if (n1 == n2) {
    return (0)
  }
  return (null)
}
f.numIn = (num, min, max, inclusive) => {
  if (inclusive || inclusive == null) {
    if (num <= max) {
      if (num >= min) {
        return(true);
      }
    }
  } else {
    if (num < max) {
      if (num > min) {
        return (true);
      }
    }
  }
  return (false);
}
f.toWhole = function (num) {
  if (num < 0) {
    num = -1;
  } else if (num > 0) {
    num = 1;
  }
  return (num);
};
f.numBetween = (n1, n2, d, inclusive) => {
  if (inclusive == true || inclusive == null) {
    if (n1 >= n2 - d) {
      if (n1 <= n2 + d) {
        return (true);
      }
    }
  } else {
    if (n1 > n2 - d) {
      if (n1 < n2 + d) {
        return (true);
      }
    }
  }
  return (false);
}
f.setBorder = (num, min, max) => {
  if (min == null) {
    min = 0;
  }
  if (max == null) {
    max = 100;
  }
  if (num > max) {
    num = max;
  } else if (num < min) {
    num = min;
  }
  return (num);
}
f.data.wrapNum = {
  iters: 100,
  defMin: 0,
  defMax: 100
}
f.wrapNum = (num, min, max, iters, fallback) => {
  if ([null, undefined, "", 0].includes(iters)) {
    iters = f.data.wrapNum.iters;
  }
  if (min == null) {
    min = f.data.wrapNum.defMin;
  }
  if (max == null) {
    max = f.data.wrapNum.defMax;
  }
  for (i = 0; i < iters; i++) {
    if (num > max) {
      num = min + (num - max);
    }
    if (num < min) {
      num = max - (min - num);
    }
    if (num <= max && num >= min) {
      break;
    }
    if (i >= iters - 1) {
      console.error("Inbuilt error: Too many iterations - stopped to prevent crashing");
    }
  }
  if (! (num <= max && num >= min)) {
    if (fallback == "max") {
      num = max;
    } else  {
      num = min;
    }
  }
  return(num);
}
f.highestMultiple = function (num1, num2) {
  mult = 0;
  while ((mult + num2) <= num1) {
    mult += num2;
  }
  return(mult);
}
f.sleep = (amount, func) => {
  if (typeof func == "function") {
    if (f.isType(amount, "float")) {
      setTimeout(() => {
        func();
      }, amount);
    } else {
      console.error("Inbuilt error: Amount is not defined or is not a float");
    }
  } else {
    console.error("Inbuilt error: Function not defined");
  }
}
f.newElement = (v = { tag, id, parent, content }) => {
  element = document.createElement(v.tag);
  element.id = v.id;
  if (v.parent == "b" || v.parent == null) {
    v.parent = document.body;
  }
  if (v.parent == "h") {
    v.parent = document.head;
  }
  if (v.content != null) {
    element.innerHTML = v.content;
  }
  v.parent.appendChild(element);
}
f.low = function () {
  if (arguments.length >= 1) {
    var args = arguments.values();
    if (arguments[0].constructor == Array) {
      if (arguments[0].length >= 1) {
        var args = arguments[0];
      }
    }
    var num = null;
    for (i2 = 0; i2 < args.length; i2++) {
      if (f.isType(args[i2], "f")) {
        if (num == null || num > args[i2]) {
          num = args[i2];
        }
      }
    }
    if (num != null) {
      return([num, args.indexOf(num)]);
    }
    return (null);
  }
  return(null);
}
f.high = function () {
  if (arguments.length >= 1) {
    var args = arguments;
    if (arguments[0].constructor == Array) {
      if (arguments[0].length >= 1) {
        var args = arguments[0];
      }
    }
    var num = null;
    for (i2 = 0; i2 < args.length; i2++) {
      if (f.isType(args[i2], "f")) {
        if (num == null || num < args[i2]) {
          num = args[i2];
        }
      }
    }
    if (num != null) {
      return (parseFloat(num));
    }
    return (null);
  }
  return (null);
}
f.vals = {}
f.val = (name, cond, func1, func2, start) => {
  if (f.vals[name] == null) {
    if (start == null) {
      start = false;
    }
    f.vals[name] = start;
  }
  if (cond) {
    if (f.vals[name]) {
      if (func1 != null) {
        func1();
      } else {
        return (true);
      }
      f.vals[name] = false;
    } else {
      if (func2 != null) {
        func2();
      }
    }
  } else {
    f.vals[name] = true;
  }
}
f.toPos = (num) => {
  if (num < 0) {
    return (0 - num);
  }
  return (num);
}
f.toNeg = (num) => {
  if (num > 0) {
    return (0 - num);
  }
  return (num);
}
f.toOne = function (num) {
  if (num > 0) {
    return (-1);
  } else if (num < 0) {
    return (1);
  }
  return (0);
}
f.sort = (dict, type, reverse) => {
  if (type == "key" || type == null) {
    var sorted = [];
    for (var key in dict) {
      sorted[sorted.length] = key;
    }
    sorted.sort();
    var tempDict = {};
    for (var i = 0; i < sorted.length; i++) {
      tempDict[sorted[i]] = dict[sorted[i]];
    }
  }
  return tempDict;
}
f.hourFormat = (num, cond) => {
  if (cond) {
    if (num > 12) {
      num = num - 12;
    }
    return (num);
  }
}
f.ls = (get, set) => {
  if (set == null) {
    return (localStorage.getItem(get));
  } else {
    if (get != null) {
      localStorage.setItem(get, set);
      return (true);
    } else {
      return (false);
    }
  }
}
f.addOrd = (num) => {
  var ord = "th";
  if (num == 1) {
    ord = "st";
  } else if (num == 2) {
    ord = "nd";
  } else if (ord == 3) {
    ord = "rd";
  }
  return (num + ord);
}
f.send = function (data, name) {
  f.ls(name, data);
}
f.reach = function (name) {
  var data = f.ls(name);
  f.ls(name, "");
  return (data);
}
f.getHTML = (url) => {
  fetch(url)
    .then(function (response) {
      switch (response.status) {
        case 200:
          return (response.text());
        case 404:
          throw (response);
      }
    })
    .then(function (template) {
      f.send(template, "urlData");
    })
    .catch(function (response) {
      f.send(response.statusText, "urlData");
    });
  return (f.reach("urlData"));
}
f.online = function () {
  var isOnline;
  return ({
    status: isOnline
  });
}
f.getPage = () => {
  page = window.location.pathname.split("/");
  page = page[page.length - 1];
  page = page.split(".")[0];
  return (page);
}
f.openFile = (file, func) => {
  var input = file.target;
  var reader = new FileReader();
  reader.onload = function () {
    var dataURL = reader.result;
    func(dataURL);
  };
  reader.readAsDataURL(input.files[0]);
};
f.docId = (id) => {
  return(document.getElementById(id));
}
doc = document;
doc.id = function (el) {
  return(doc.getElementById(el));
};
doc.tag = function (el) {
  return(doc.getElementsByTagName(el));
};
f.removeChildren = function (el) {
  for (i = 0; i < el.childNodes.length; i++) {
    el.removeChild(el.childNodes[i]);
  }
}
HTMLElement.prototype.removeChildren = function () {
  while (this.firstChild) {
    this.firstChild.remove();
  }
}
HTMLElement.prototype.hasFocus = function () {
  if (doc.activeElement === this) {
    return(true);
  }
}
f.setCaretPos = function (ctrl, pos) {
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}
f.counters = {}; 
f.interval = (func, max, time, overflow) => {
  f.counters[func] = null;
  function stop() {
    clearInterval(f.counters[func]);
  }
  var count = 0;
  f.counters[func] = setInterval(() => {
    if (func.constructor = Function) {
      func(count, max);
    }
    count++;
    if ((max >= 0) && (count >= max)) {
      stop();
      if (! [null, undefined].includes(overflow) && overflow.constructor == Function) {
        overflow(max);
      }
    }
  }, time);
}
f.data.addStyle = {
  headId: "styleinsert_head",
  bodyId: "styleinsert_body"
}
f.addStyle = (css, inBody) => {
  if (inBody) {
    if (f.docId(f.data.addStyle.bodyId) == null) {
      var style = document.createElement('style');
      style.id = f.data.addStyle.bodyId;
    } else {
      var style = f.docId(f.data.addStyle.bodyId);
    }
  } else {
    if (f.docId(f.data.addStyle.headId) == null) {
      var style = document.createElement('style');
      style.id = f.data.addStyle.headId;
    } else {
      var style = f.docId(f.data.addStyle.headId);
    }
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  if (inBody) {
    document.getElementsByTagName('body')[0].appendChild(style);
  } else {
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}

f.copy = (text) => {
  if (!navigator.clipboard) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
    } catch (err) {
    }
    document.body.removeChild(textArea);
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
  }, function (err) {
    console.error("Unknown error: {0}".format(err));
  });
}
f.joinArray = function () {
  var a = [];
  for (i = 0; i < arguments.length; i++) {
    for (i2 = 0; i2 < arguments[i].length; i2++) {
      a.push(arguments[i][i2]);
    }
  }
  return(a);
}
f.triggerOnload = function (type) {
  if ([null, undefined].includes(type)) {
    type = "";
  };
  $(function () {
    $("{0}[onload]".format(type)).not($("body")).trigger("onload");
  });
}
f.data.browser = {
  0: "Chrome",
  1: "Opera",
  2: "Safari",
  3: "Firefox",
  4: "Internet Explorer",
}
f.browser = function() {
  if (navigator.userAgent.indexOf("Chrome") != -1) {
    return (f.data.browser[0]);
  }
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
    return (f.data.browser[1]);
  }
  if (navigator.userAgent.indexOf("Safari") != -1) {
    return (f.data.browser[2]);
  }
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    return (f.data.browser[3]);
  }
  if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
    return (f.data.browser[4]);
  }
  return (undefined);
}
f.isJson = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return (false);
  }
  return (true);
}
// String functions
String.prototype.format = function () {
  var a = this;
  if (! [null, undefined].includes(arguments[0])) {
    if (arguments[0].constructor == Object) {
      var a = this;
      for (k in (arguments[0]).keys()) {
        a = a.replaceAll("{" + (arguments[0]).keys()[k] + "}", (arguments[0]).values()[k])
      }
      return (a);
    } else if (arguments[0].constructor == Array) {
      var a = this;
      for (k in f.range(arguments[0].length)) {
        a = a.replaceAll("{" + k + "}", (arguments[0])[k])
      }
      return (a);
    } else {
      for (k in arguments) {
        a = a.replaceAll("{" + k + "}", arguments[k])
      }
      return (a);
    }
  } else {
    console.log(this, arguments);
    console.error("Inbuilt error: Undefined format")
  }
}
/* String.prototype.replaceAll = function (search, replace) {
  return(this.split(search).join(replace));
} */
String.prototype.replaceAll = function () {
  if (! [undefined, null].includes(arguments[0])) {
    if (arguments[0].constructor == Object) {
      var otp = this;
      for (i = 0; i < arguments[0].keys().length; i++) {
        otp = otp.split(arguments[0].keys()[i]).join(arguments[0].values()[i]);
      }
      return (otp);
    }
    return (this.split(arguments[0]).join(arguments[1]));
  }
}
String.prototype.find = function () {
  var str = this;
  var sub = arguments[0];
  var amount = 1;
  if (arguments.length >= 2) {
    amount = arguments[1];
  }
  val = true;
  for (i = 0; i < amount; i++) {
    if (!str.split(sub).slice(i, str.split(sub).length).join(sub).includes(sub)) {
      val = false;
    }
  }
  return (val);
}
String.prototype.sub = function (start, end) {
  var arr = this.split("");
  return (arr.sub(start, end).join(""));
}
f.data.valid = {
  invalid: [null, "null", undefined, "undefined"],
  invalidBool: [null, "null", undefined, "undefined", true, "true", false, "false"]
};
String.prototype.valid = function (bool) {
  console.log(this.values().join(""));
  if (bool) {
    if (f.data.valid.invalidBool.includes(this.values().join(""))) {
      return(false);
    }
  } else {
    if (f.data.valid.invalid.includes(this.values().join(""))) {
      return (false);
    }
  }
  return(true);
}
String.prototype.join = function () {
  return(this + "");
}
// Array functions
Array.prototype.sub = function (start, end) {
  var a = this;
  var arr = [];
  for (i = 0; i < a.length; i++) {
    arr.push(a[i]);
  };
  for (i = 0; i < arr.length; i++) {
    if (arr[i].constructor != String) {
      arr[i] = JSON.stringify(arr[i]);
    }
  }
  if ([null, undefined].includes(start)) {
    start = 0;
  };
  if (end == null) {
    end = start + 1;
    if (start < 0) {
      end--;
    };
  };
  if (start < 0) {
    start = arr.length + start;
  };
  if (end < 0) {
    end = arr.length + end + 1;
  };
  arr = arr.slice(start, end);
  if (arr.length <= 1) {
    return (arr.join(""));
  };
  for (i = 0; i < arr.length; i++) {
    // console.log(JSON.parse(arr[i]));
    if (f.isJson(arr[i])) {
      arr[i] = JSON.parse(arr[i]);
    } else {
    };
  };
  return (arr);
}
Array.prototype.append = function(item) {
  var arr = this;
  arr.push(item);
}
Array.prototype.formatOutput = function(s1) {
  if (s1 == null) {
    s1 = "\n";
  }
  var arr = this;
  var otp = "";
  for (i = 0; i < arr.length; i++) {
    otp = otp + arr[i] + s1;
  }
  return (otp);
}
Array.prototype.remove = function(item) {
  if (this.includes(item)) {
    var a = this.slice(0, this.indexOf(item));
    var b = this.slice(this.indexOf(item) + 1, this.length);
    var c = [];
    for (i = 0; i < a.length; i++) {
      c.push(a[i]);
    }
    for (i = 0; i < b.length; i++) {
      c.push(b[i]);
    }
    return(c);
  }
  return(this);
}
Array.prototype.removeM = function() {
  items = arguments;
  for (i = 0; i < items.length; i++) {
    if (this.includes(item)) {
      var a = this.slice(0, this.indexOf(item));
      var b = this.slice(this.indexOf(item) + 1, this.length);
      var c = [];
      for (i = 0; i < a.length; i++) {
        c.push(a[i]);
      }
      for (i = 0; i < b.length; i++) {
        c.push(b[i]);
      }
      return (c);
    }
  }
  return (this);
}
Array.prototype.addAll = function (num) {
  var arr = [];
  if (! [null, undefined].includes(num) && num.constructor == Number) {
    for (i = 0; i < this.length; i++) {
      if (! [null, undefined].includes(this[i]) && this[i].constructor == Number) {
        arr[i] = this[i] + num;
      } else {
        arr[i] = this[i];
      };
    };
  };
  return(arr);
};
Array.prototype.remove = function (item) {
  arr = this;
  index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
Array.prototype.getFromId = function (name, id) {
  arr = this;
  if ([null, undefined, ""].includes(id)) {
    id = "id";
  }
  for (i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    if (arr[i][id] == name) {
      return(arr[i]);
    }
  }
}
Array.prototype.getIndexFromId = function (name, id) {
  arr = this;
  if ([null, undefined, ""].includes(id)) {
    id = "id";
  }
  for (i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    if (arr[i][id] == name) {
      return(i);
    }
  }
  return(-1);
}
// Object functions
Object.prototype.keys = function () {
  return (Object.keys(this));
}
Object.prototype.values = function () {
  return (Object.values(this));
}
Object.prototype.formatOutput = function (s1, s2) {
  if (s1 == null) {
    s1 = ": ";
  }
  if (s2 == null) {
    s2 = "\n";
  }
  var obj = this;
  var otp = "";
  for (i = 0; i < obj.keys().length; i++) {
    otp = otp + obj.keys()[i] + s1 + obj.values()[i] + s2;
  }
  return(otp);
}
Object.prototype.switchValues = function () {
  var otp = {}
  for (i = 0; i < this.keys().length; i++) {
    otp[this.values()[i]] = this.keys()[i];
  }
  return(otp);
}
Object.prototype.ifTrue = function () {
  var otp = []
  for (key = 0; key < this.keys().length; key++) {
    if (this.values()[key]) {
      otp.push(this.keys()[key]);
    }
  }
  return(otp);
}
Object.prototype.indexOf = function (item) {
  for (i = 0; i < this.keys().length; i++) {
    if (this[this.keys()[i]] == item) {
      return(this.keys()[i]);
    }
  }
}
Object.prototype.getFromValue = function (value) {
  obj = this;
  for (i = 0; i < obj.keys().length; i++) {
    if (obj.values()[i] == value) {
      return (obj.keys()[i]);
    }
  }
}
// Number functions
Number.prototype.parseString = function () {
  return(this + "");
}
Number.in = function (min, max, inclusive) {
  num = this;
  if (inclusive || inclusive == null) {
    if (num <= max) {
      if (num >= min) {
        return(true);
      }
    }
  } else {
    if (num < max) {
      if (num > min) {
        return (true);
      }
    }
  }
  return (false);
}
CanvasRenderingContext2D.prototype.fillCanvas = function (color) {
  prevColor = this.fillStyle;
  if ([null, undefined, ""].includes(color)) {
    color = "rgba(60, 60, 60)";
  }
  this.fillStyle = color;
  this.fillRect(0, 0, canvas.width, canvas.height);
  this.fillStyle = prevColor;
}
CanvasRenderingContext2D.prototype.getPixelColor = function (x, y) {
  return (this.getImageData(x, y, 1, 1,).data);
}
CanvasRenderingContext2D.prototype.scanCanvas = function () {
  output = []
  for (x = 0; x < canvas.width; x++) {
    output.push([]);
    for (y = 0; y < canvas.height; y++) {
      output[x].push(f.rgb_hex(ctx.getPixelColor(x, y)[0], ctx.getPixelColor(x, y)[1], ctx.getPixelColor(x, y)[2]));
    }
  }
  return (output);
}
// Other
f.getCtx = function () {
  for (i in self) {
    if (! [null, undefined].includes(self[i])) {
      if (self[i].constructor == CanvasRenderingContext2D) {
        return(self[i]);
      }
    }
  }
}
f.getCanvas = function () {
  for (i in self) {
    if (! [null, undefined].includes(self[i])) {
      if (self[i].constructor == HTMLCanvasElement) {
        return(self[i]);
      }
    }
  }
}
f.trace = function (p1, p2, pd) {
  if ([null, undefined, "", 0].includes(pd)) {
    pd = 10;
  }
  dst = Math.round(Math.max(f.diff(p1.x, p2.x), f.diff(p1.y, p2.y)));
  amount = dst / pd;
  ray = [];
  for (p = amount; p > 0; p--) {
    ray.push({
      x: p1.x + ((p2.x - p1.x) * ((p / amount) / 1.001)),
      y: p1.y + ((p2.y - p1.y) * ((p / amount) / 1.001)),
    });
    if (ray[amount - p].x == p2.x && ray[amount - p].y == p2.y) {
      break;
    }
  }
  return (ray);
}
f.download = function (base64, fileName) {
  if ([null, undefined, ""].includes(fileName)) {
    fileName = "{0}_{1}.png".format(doc.tag("title")[0].innerHTML, Date.now());
  }
  f.downloader = doc.createElement("a");
  f.downloader.download = fileName;
  f.downloader.href = "data:image/" + base64;
  f.downloader.click();
}
f.downloadCanvas = function (canv, fileName) {
  if ([null, undefined, ""].includes(fileName)) {
    fileName = "{0}_{1}.png".format(doc.tag("title")[0].innerHTML.toLowerCase().replaceAll(" ", ""), Date.now());
  }
  if ([null, undefined, ""].includes(canv)) {
    canv = doc.tag("canvas")[0];
  }
  f.download(canv.toDataURL(), fileName);
}
/* Put PI calculator here */