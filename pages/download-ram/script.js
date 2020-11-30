// Do not edit
function randInt(min, max) {
  return (Math.random() * (max - min) + min)
}
// Do not edit
var done = false;
var downloadProgress = [
  "Locating CPU...",
  "CPU Located...",
  "Accessing cores...",
  "Delivering ram.exe",
  "Splitting code",
  "Optimizing...",
  "Activating cur.br...",
  "Testing drive...",
  "Running valve decompression...",
  "Changing CPU construct...",
  "Updating pylons...",
  "Finalising tests..."
]
// Do not edit
function testRam() {
  textNum = 0;
  document.getElementById("text").innerHTML = downloadProgress[0];
  for (i = 0; i < downloadProgress.length; i++) {
    setTimeout(() => {
      changeText();
    }, randInt(500, 4000));
  }
}
// Do not edit
function changeText() {
  textNum++;
  if (textNum <= (downloadProgress.length - 1)) {
    document.getElementById("text").innerHTML = downloadProgress[textNum - 1];
  } else {
    setTimeout(displayResults(), 1000);
  }
}
// Do not edit
ramValue = [
  [-100, "It is a wonder your computer actually works"],
  [0, "That is terrible"],
  [4, "That is below average"],
  [8, "That is not great"],
  [16, "That is decent"],
  [32, "That is pretty good"],
  [100, "That is great"]
]
// Do not edit
function displayResults() {
  var result = Math.round(randInt(2, 12) * 10) / 10;
  document.getElementById("text").innerHTML = "Ram: " + result + "GB";
  var ret = null;
  for (i = 0; i < ramValue.length; i++) {
    if (ret == null) {
      if (result >= ramValue[i][0]) {
        if ((i + 1) < ramValue.length) {
          if (result < ramValue[i + 1][0]) {
            ret = ramValue[i][1];
          }
        } else {
          ret = ramValue[i][1];
        }
      }
    }
  }
  if (ret != null) {
    document.getElementById("text2").innerHTML = ret;
  } else {
    document.getElementById("text2").innerHTML = "I don't know";
  }
  setTimeout(() => {
    document.getElementById("download").style.visibility = "visible";
  }, 500);
}