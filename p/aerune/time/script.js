change();

function change() {
  h = parseInt(doc.id("hour").value) || 0;
  m = parseInt(doc.id("minute").value) || 0;
  s = parseInt(doc.id("second").value) || 0;
  l = 0;

  if (h > 23) {
    h = 24 - h;
  }
  if (m > 59) {
    m = 60 - m;
  }
  if (s > 59) {
    s = 60 - s;
  }

  if (h < 0) {
    h = 22 - h;
  }
  if (m < 0) {
    m = 58 - m;
  }
  if (s < 0) {
    s = 58 - s;
  }

  doc.id("hour").value = h;
  doc.id("minute").value = m;
  doc.id("second").value = s;


  h *= (16 / 24);
  ho = h - Math.floor(h);
  h -= ho;

  m += ho;
  m *= (60 / 64);
  mo = m - Math.floor(m);
  m -= mo;

  s += mo * 60;
  s *= (60 / 64);
  so = s - Math.floor(s);
  s -= so;

  l = so * 1000;

  doc.id("output").value = "{0} : {1} : {2} . {3}".format(h, m, s, Math.round(l / 10));
}

live_change();
var live_interval = null;
function live_update() {
  if (doc.id("live").checked) {
    d = new Date();
    doc.id("hour").value = d.getHours();
    doc.id("minute").value = d.getMinutes();
    doc.id("second").value = d.getSeconds();
    change();
    live_interval = setTimeout(live_update, 100);
  }
}
function live_change() {
  if (doc.id("live").checked) {
    live_update();
  }
}