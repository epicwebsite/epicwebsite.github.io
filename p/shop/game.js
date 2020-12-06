var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var cam = {};
var items = [];
var shop = "test";
var selectedPlace = null;

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}

function addItem(item) {
  if (!item) {
    item = doc.id("item").value;
  }
  item = item.lower();
  if (!data.items.keys().includes(item)) {
    createItem();
  } else {
    if (item.replaceAll(" ", "")) {
      if (!items.includes(item)) {
        items.push(item);
      }
    }
  }
  updateItems();
  changeAvailable();
}
function updateItems() {
  doc.id("items").innerHTML = "";
  for (i = 0; i < items.length; i++) {
    place = "unknown";
    if (data.items[items[i]] && data.items[items[i]].place) {
      place = data.items[items[i]].place;
    }
    el = [
      '<li value="{id}"><button onclick="removeItem(this)" class="fa fa-trash"></button> {name} <i>{place}</i></li>'
    ].join("").format({
      id: items[i].lower().replaceAll(" ", ""),
      name: items[i].capWords(),
      place: place.capWords(),
    });
    doc.id("items").innerHTML += el;
    doc.id("item").value = "";
  }
}
function changeAvailable() {
  doc.id("available_items").innerHTML = "";
  let item = doc.id("item").value.lower();
  if (item && item.replaceAll(" ", "")) {
    let els = [];
    for (e = 0; e < data.items.keys().length; e++) {
      if (!data.items.keys()[e].replaceAll(" ", "").startsWith(item.replaceAll(" ", ""))) {
        continue;
      }
      els.push([
        '<li><button onclick="addItem(\'{name}\')" class="fa fa-cart-plus"></button>{name}</li>',
      ].join("").format({
        name: data.items.keys()[e].capWords(),
      }));
    }
    if (!data.items.keys().includes(item)) {
      els.push([
        '<li><button onclick="createItem()" class="fa fa-plus-square"></button>{name}</li>',
      ].join("").format({
        name: item.capWords(),
      }));
    }
    doc.id("available_items").innerHTML = els.join("");
  }
}
function addItemFromInput() {
  let item = doc.id("item").value;
  addItem(item);
}
function createItem() {
  let item = doc.id("item").value.lower();
  if (item && item.replaceAll(" ", "")) {
    if (!data.items.keys().includes(item)) {
      data.items[item] = {
        place: undefined,
      };
      addItem(item);
    }
  }
  changeAvailable();
}
function removeItem(el) {
  item = el.parentNode.getAttribute("value");
  items.remove(item);
  updateItems();
}

function resetCam() {
  cam = {
    x: 0,
    y: 0,
    z: 100,
  };
  doc.id("x").value = cam.x;
  doc.id("y").value = cam.y;
  doc.id("z").value = cam.z;
}

var then = Date.now();
reset();
main();