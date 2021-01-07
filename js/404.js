function init() {
  doc.id("link").href = F.url.online ? "./" : "./index.html";

  path = F.url.filepath;
  redirected = false;

  for (o = 0; o < links.keys().length; o++) {
    for (l = 0; l < links.values()[o].items.length; l++) {
      if (path.split("/")[0] == links.values()[o].items[l].id) {
        link = "https://{0}.github.io/p/{1}".format(
          meta.domain,
          links.values()[o].items[l].id,
        );
        doc.id("header").innerHTML = "Redirecting...";
        doc.id("text").innerHTML = "If that doesn't work, go to <a href='{0}'><em>this link</em></a>".format(link);
      /* location.href = link */
        redirected = true;
        break;
      }
    }
  }

  if (!redirected) {
    doc.id("path").innerHTML = "'{0}'".format(path);
  }
}