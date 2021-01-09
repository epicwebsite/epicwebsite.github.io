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