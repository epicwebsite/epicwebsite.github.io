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
  console.log(otp);
  return (otp);
}
f.collide = (r1, r2) => {
  if (r1.x + r1.w > r2.x &&
    r1.x < r2.x + r2.w &&
    r2.y + r2.h > r1.y &&
    r2.y < r1.y + r1.h) {
    return (true);
  } else {
    return (false);
  }
}
f.loadScript = (src, id) => {
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
  document.body.append(script);
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
  console.error("Inbuilt error: invalid hex code");
}
f.componentToHex = (c) => {
  var hex = c.toString(16);
  return (hex.length == 1 ? "0" + hex : hex);
}
f.rgb_hex = (r, g, b) => {
  return ("#" + f.componentToHex(r) + f.componentToHex(g) + f.componentToHex(b));
}
f.rgb_hsv = (r, g, b) => {
  var v=Math.max(r,g,b), n=v-Math.min(r,g,b);
  var h= n && ((v==r) ? (g-b)/n : ((v==g) ? 2+(b-r)/n : 4+(r-g)/n)); 
  return ({
    h: 60*(h<0?h+6:h), 
    s: v&&n/v, 
    v: v
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
addEventListener("keydown", function (e) {
  f.keysDown[e.keyCode] = true;
}, false)
addEventListener("keyup", function (e) {
  delete f.keysDown[e.keyCode];
}, false)
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
f.mouse = { x: null, y: null };
f.getMousePos = (e) => {
  return {
    x: e.clientX,
    y: e.clientY
  };
}
addEventListener("mousemove", function (e) {
  f.mouse = f.getMousePos(e);
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
    return (n2 - 1)
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
f.wrapNum = (num, min, max, fallback) => {
  if (min == null) {
    min = f.data.wrapNum.defMin;
  }
  if (max == null) {
    max = f.data.wrapNum.defMax;
  }
  for (i = 0; i < f.data.wrapNum.iters; i++) {
    if (num > max) {
      num = min + (num - max);
    }
    if (num < min) {
      num = max - (min - num);
    }
    if (num <= max && num >= min) {
      break;
    }
    if (i >= f.data.wrapNumIters - 1) {
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
f.send = (data, name) => {
  f.ls(name, data);
}
f.reach = (name) => {
  var a = f.ls(name);
  f.ls(name, "");
  return (a);
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
f.online = () => {
  var isOnline = false;
  
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
f.interval = (func, max, time) => {
  var count = 0;
  var counter = setInterval(() => {
    func(count);
    count++;
    if (count >= max) {
      clearInterval(counter);
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
// String functions
String.prototype.format = function () {
  var a = this;
  if (arguments[0] != undefined && arguments[0] != null) {
    if (arguments[0].constructor == Object) {
      var a = this;
      for (k in Object.keys(arguments[0])) {
        a = a.replace("{" + Object.keys(arguments[0])[k] + "}", Object.values(arguments[0])[k])
      }
      return (a);
    } else {
      for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
      }
      return (a);
    }
  } else {
    console.error("Inbuilt error: Undefined format")
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
  if (start == null) {
    start = 0;
  }
  if (end == null) {
    end = start;
  }
  if (start < 0) {
    start = arr.length + start;
  }
  if (end < 0) {
    end = arr.length + end + 1;
  }
  return (arr.slice(start, end).join(""));
}
// Array functions
Array.prototype.sub = function (start, end) {
  var arr = this;
  if (start == null) {
    start = 0;
  }
  if (end == null) {
    end = start;
  }
  if (start < 0) {
    start = arr.length + start;
  }
  if (end < 0) {
    end = arr.length + end + 1;
  }
  return (arr.slice(start, end));
}
Array.prototype.append = function(item) {
  var arr = this;
  arr.push(item);
}
Array.prototype.output = function (s1) {
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
// Object functions
Object.prototype.keys = function () {
  return (Object.keys(this));
}
Object.prototype.values = function () {
  return (Object.values(this));
}
Object.prototype.output = function (s1, s2) {
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