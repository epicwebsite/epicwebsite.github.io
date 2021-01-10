function init() {
  setTable();
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
      el += '<td>{0}</td>'.format(
        food[v].items[i] ? food[v].items[i] : "",
      );
    }
    doc.id("table").innerHTML += el + '</tr>';
  }
}

function search() {
  var text = doc.id("search").value;
  if (text.length > 0) {
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

  text = text.lower().split(" ");
  results = {};
  for (r = 0; r < food.length; r++) {
    for (j = 0; j < food[r].items.length; j++) {
      let res = food[r].items[j].lower();
      for (w = 0; w < res.split(" ").length; w++) {
        for (n = 0; n < text.length; n++) {
          if (
            text[n].length > 0
            && res.split(" ")[w].strip(F.chars.lower).includes(text[n])
          ) {
            results.add("{0}_{1}".format(r, j), 1, 1);
          }
        }
      }
    }
  }

  temp = [];
  for (i = 0; i < results.keys().length; i++) {
    temp.push({
      title: food[results.keys()[i].split("_")[0]].items[results.keys()[i].split("_")[1]],
      search: results.values()[i],
      group: food[results.keys()[i].split("_")[0]].name,
    });
  }
  let length = temp.length;
  results = F.toArray(temp.sub(0, 10));
  results.sort(function (a, b) {
    return (b.search - a.search);
  });
  delete temp;

  el = '<tr>';
  done = [];
  for (v = 0; v < results.length; v++) {
    if (!done.includes(results[v].group)) {
      el += '<th>{0}</th>'.format(
        results[v].group,
      );
      done.push(results[v].group);
    }
  }
  doc.id("output").innerHTML = el + '</tr>';

  groups = {};
  for (i = 0; i < results.length; i++) {
    if (!groups[done.indexOf(results[i].group)]) {
      groups[done.indexOf(results[i].group)] = [];
    }
    groups[done.indexOf(results[i].group)].push(results[i].title);

    /* console.log("{group} {title}".format({
      search: results[i].search,
      title: results[i].title,
      group: (results[i].group + ":").fill(20, " ", false),
    })); */
  }

  length = 0;
  for (i = 0; i < groups.keys().length; i++) {
    length = Math.max(length, groups.values()[i].length);
  }

  for (i = 0; i < length; i++) {
    el = '<tr>';
    for (v = 0; v < groups.keys().length; v++) {
      el += '<td>{0}</td>'.format(
        groups.values()[v][i] ? groups.values()[v][i] : "",
      );
    }
    doc.id("output").innerHTML += el + '</tr>';
  }
}