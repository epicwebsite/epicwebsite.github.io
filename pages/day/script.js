var date = new Date();
var day = date.getDay() - 1;
var days = {
  classic: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  monke: [
    "monke Monday",
    "tummy monke Tuesday",
    "wet monke Wednesday",
    "thirsty monke Thursday",
    "funky monke Friday :)",
    "stinky monke Saturday",
    "sad monke Sunday :)",
  ],
};

function init() {
  doc.id("type").value = F.ls("type") && days[F.ls("type")] ? F.ls("type") : "classic";
  changeText();
}
function changeText() {
  text = days[doc.id("type").value][day];
  doc.id("day").innerHTML = "Today is {0}".format(text ? text : "???");
}
function setLocal() {
  F.ls("type", doc.id("type").value);
}
function changeDay(d) {
  day = d;
  changeText();
  setLocal();
}
function addDay() {
  day++;
  changeText();
  setLocal();
}