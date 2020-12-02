function init() {
  
}
function gen() {
  var input = f.docId("input").value;
  f.docId("output").value = ""
  for (i = 0; i < input.length; i++) {
    valWords = [];
    for (i2 = 0; i2 < words.length; i2++) {
      if (words[i2][0] == input[i]) {
        valWords.push(words[i2]);
      }
    }
    f.docId("output").value = f.docId("output").value + f.randChoice(valWords).capFormat() + "\n";
  }
}