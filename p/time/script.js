var now = new Date();
function init() {
  for (i = 0; i < bars.length; i++) {
    var el = [
      '<section>',
      '<progress class="progress" id="progress_{id}" value="{value}" max="{max}"></progress>',
      '<h1>{text}</h1>',
      '<h2>{value} / {max}</h2>',
      '<h2>{perc}%</h2>',
      '</section>',
    ].join("").format({
      id: bars[i].id,
      value: bars[i].value(),
      max: bars[i].max,
      text: bars[i].text,
      perc: (Math.round((bars[i].value() / bars[i].max) * 10000) / 100),
    });
    $("#content").append(el);
  }
  setInterval(() => {
    now = new Date();
    doc.id("content").removeChildren();
    for (i = 0; i < bars.length; i++) {
      var el = [
        '<section>',
        '<progress class="progress" id="progress_{id}" value="{value}" max="{max}"></progress>',
        '<h1>{text}</h1>',
        '<h2>{value} / {max}</h2>',
        '<h2>{perc}%</h2>',
        '</section>',
      ].join("").format({
        id: bars[i].id,
        value: bars[i].value(),
        max: bars[i].max,
        text: bars[i].text,
        perc: (Math.round((bars[i].value() / bars[i].max) * 10000) / 100),
      });
      $("#content").append(el);
    }
    doc.id("date").innerHTML = "Date: {0}".format(now.toString().split("(").sub(0, -1));
    doc.id("time").innerHTML = "Time in milliseconds: {0}".format(now.getTime());
  }, 10);
}