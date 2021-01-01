function init() {
  doc.id("link").href = F.url.online ? "./" : "./index.html";
  doc.id("path").innerHTML = F.url.filepath;
}
console.log(1);