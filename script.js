function init() {
  showLinks();
}
function showLinks() {
  doc.id("links").innerHTML = "";
  for (i = 0; i < links.length; i++) {
    let el = [
      '<a href="{href}/index.html">{name}</a>'
    ].join("").format({
      href: links[i].id,
      name: links[i].name,
    });
    $("#links").append(el);
  }
}