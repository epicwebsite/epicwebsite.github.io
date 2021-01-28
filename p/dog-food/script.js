function init() {
  setTable();
  if (F.url.query.search) {
    doc.id("search").value = F.url.query.search;
    search();
  }
}

function setTable() {
  el = '<tr>';
  for (v = 0; v < food.length; v++) {
    el += '<th>{0}</th>'.format(
      food[v].name,
    );
  }
  doc.id("table").innerHTML = el + '</tr>';

  length = 0;
  for (i = 0; i < food.length; i++) {
    if (food[0]) {
      length = Math.max(length, food[0].items.length);
    }
  }

  for (i = 0; i < length; i++) {
    el = '<tr>';
    for (v = 0; v < food.length; v++) {
      el += [
        '<td title="{title}" id="{id}">',
        '  <button {onclick} class="tableButton {hover}">',
        '    {name}',
        '    <br>',
        '    <span class="subtitle">',
        '      {subtitle}',
        '    </span>',
        '  </button>',
        '</td>'
      ].join("").format({
        id: "t_" + v + "_" + i,
        onclick: food[v].items[i] ? 'onclick="clickItem(this);"' : "",
        hover: food[v].items[i] ? "hover" : "",
        title: food[v].items[i] && food[v].items[i].tags && food[v].items[i].tags.length > 0 && food[v].items[i].tags[0] ? "Search Terms: " + food[v].items[i].tags.join(", ").capWords() : "",
        subtitle: food[v].items[i] && food[v].items[i].subtitle ? food[v].items[i].subtitle : "",
        name: food[v].items[i] && food[v].items[i].name ? food[v].items[i].name : "",
      });
    }
    doc.id("table").innerHTML += el + '</tr>';
  }
}

function search() {
  var text = doc.id("search").value;
  if (text.replaceAll(" ", "").length > 0) {
    doc.id("link").style.display = "block";
    doc.id("link").href = "https://www.google.com/search?q=can%20dog%20eat%20{0}".format(text.replaceAll(" ", "%20"));
    doc.id("link_text").innerHTML = text.capWords();
  } else {
    doc.id("link").style.display = "none";
  }

  if (!text) {
    doc.id("output").innerHTML = "";
    return;
  }
  text = text.lower();

  results = {};
  for (v = 0; v < food.length; v++) {
    for (i = 0; i < food[v].items.length; i++) {
      key = "{0}_{1}".format(v, i);
      num = 0;
      for (l = 0; l < food[v].items[i].name.split(" ").length; l++) {
        for (j = 0; j < text.split(" ").length; j++) {
          if (!text.split(" ")[j]) {
            continue;
          }
          if (food[v].items[i].name.split(" ")[l].includes(text.split(" ")[j])) {
            num += 10;
          }
        }
      }
      for (t = 0; t < food[v].items[i].tags.length; t++) {
        if (!food[v].items[i].tags[t]) {
          continue;
        }
        for (l = 0; l < food[v].items[i].tags[t].split(" ").length; l++) {
          for (j = 0; j < text.split(" ").length; j++) {
            if (!text.split(" ")[j]) {
              continue;
            }
            if (food[v].items[i].tags[t].split(" ")[l].includes(text.split(" ")[j])) {
              num += 1;
            }
          }
        }
        if (text.includes(food[v].items[i].tags[t])) {
          num += 7;
        }
      }
      if (num) {
        if (!results[key]) {
          results[key] = {
            name: food[v].items[i].name,
            subtitle: food[v].items[i].subtitle,
            group: food[v].name,
            num: 0,
            v,
            i,
          };
        }
        results[key].num = num;
      }
    }
  }
  results.sort((a, b) => {
    return (a.num > b.num);
  });

  el = '<tr>';
  done = [];
  for (v = 0; v < results.keys().length; v++) {
    if (!done.includes(results.values()[v].group)) {
      el += '<th>{0}</th>'.format(
        results.values()[v].group,
      );
      done.push(results.values()[v].group);
    }
  }
  doc.id("output").innerHTML = el + '</tr>';

  groups = [];
  for (i = 0; i < results.keys().length; i++) {
    if (!groups[done.indexOf(results.values()[i].group)]) {
      groups[done.indexOf(results.values()[i].group)] = [];
    }
    groups[done.indexOf(results.values()[i].group)].push(results.values()[i]);
  }

  length = 0;
  for (i = 0; i < groups.length; i++) {
    length = Math.max(length, groups[i].length);
  }
  max = 7;

  for (i = 0; i < Math.min(max, length); i++) {
    el = '<tr>';
    for (v = 0; v < groups.length; v++) {
      el += [
        '<td title="{title}" id="{id}">',
        '  <button {onclick} class="tableButton {hover}">',
        '   {name}',
        '   <br>',
        '   <span class="subtitle">',
        '     {subtitle}',
        '   </span>',
        '  </button>',
        '</td>'
      ].join("").format({
        id: groups[v][i] && "search_" + groups[v][i].v + "_" + groups[v][i].i,
        onclick: groups[v][i] && 'onclick="clickItem(this);"',
        hover: groups[v][i] ? "hover" : "",
        title: groups[v][i] && groups[v][i].tags && groups[v][i].tags.length > 0 && groups[v][i].tags[0] ? "Search Terms: " + groups[v][i].tags.join(", ").capWords() : "",
        subtitle: groups[v][i] && groups[v][i].subtitle ? groups[v][i].subtitle : "",
        name: groups[v][i] ? groups[v][i].name : "", 
      });
    }
    doc.id("output").innerHTML += el + '</tr>';
    if (i == max - 1 && length > max) {
      el = '<tr>';
      for (v = 0; v < groups.length; v++) {
        if (groups[v].length > max) {
          el += [
            '<td>',
            '  <button class="tableButton ect">',
            '    Ect...',
            '  </button>',
            '</td>',
          ].join("");
        } else {
          el += [
            '<td>',
            '</td>',
          ].join("");
        }
      }
      doc.id("output").innerHTML += el + '</tr>';
    }
  }
  doc.id("noResults").style.display = length < 1 ? "block" : "none";
}

function clickItem(el) {
  el = el.parentNode;
  item = el.id.split("_");
  item = food[item[1]].items[item[2]];
  el = [
    '<h1>',
    '  {name}',
    '</h1>',
    '<h2>',
    '  {subtitle}',
    '</h2>',
    '<p>',
    '  {desc}',
    '</p>',
    '<a href="https://www.google.com/search?q=can dog eat {link}">',
    '  Search google for \'{name}\'',
    '</a>',
  ].join("").format({
    name: item.name,
    link: item.name.lower(),
    subtitle: item.subtitle ? item.subtitle : "",
    desc: item.desc ? item.desc : "No information",
  });
  doc.id("desc").innerHTML = el;
}