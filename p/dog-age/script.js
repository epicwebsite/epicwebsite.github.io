var av = {
  months: 12,
  days: 30.46,
  days2: 365,
}
function init() {
  mod_change();
  input_change();
  var date = "2019-02-15";
  f.docId("i_years").value = getDateDiff(date).years;
  f.docId("i_months").value = getDateDiff(date).months;
  f.docId("i_days").value = getDateDiff(date).days;
  calc();
}
function getDateDiff(date) {
  var d = new Date();
  date = date.split("-");
  years = d.getFullYear() - parseInt(date[0]);
  months = d.getMonth() - parseInt(date[1]);
  days = d.getDate() - parseInt(date[2]);
  if (months < 0) {
    months = Math.round(av.months + months);
    years--;
  }
  if (days < 0) {
    days = Math.round(av.days + days);
  }
  return ({
    years: years,
    months: months,
    days: days,
  });
}
function calc() {
  var date = "2019-02-15";
  if ([null, undefined, ""].includes(f.docId("i_years").value)) {
    f.docId("i_years").value = getDateDiff(date).years;
  }
  if ([null, undefined, ""].includes(f.docId("i_months").value)) {
    f.docId("i_months").value = getDateDiff(date).months;
  }
  if ([null, undefined, ""].includes(f.docId("i_days").value)) {
    f.docId("i_days").value = getDateDiff(date).days;
  }
  var years = parseInt(f.docId("i_years").value);
  var months = parseInt(f.docId("i_months").value);
  var days = parseInt(f.docId("i_days").value);
  if (f.docId("input_type").value == "bday") {
    var date = f.docId("i_date").value;
    years = getDateDiff(date).years;
    months = getDateDiff(date).months;
    days = getDateDiff(date).days;
  }
  if (f.docId("mod").value == "other") {
    var mod = parseInt(f.docId("i_mod").value);
  } else {
    var mod = parseInt(f.docId("mod").value);
  }
  // Convert months to days
  days += (months * av.days);
  months = 0;
  // Convert years to months
  months = (years * av.months);
  years = 0;
  // Convert months to days
  days += (months * av.days);
  months = 0;
  // Times days by amount
  days *= mod;
  // Convert days to years
  years = Math.floor(days / av.days2);
  // Remove days that were converted into years
  days = days - (av.days2 * years);
  // Convert days to months
  months = Math.floor(days / av.days);
  days = days - (av.days * months);
  // Round days
  days = Math.round(days);
  // Output
  console.log("{0} years, {1} months, {2} days".format(years, months, days));
  f.docId("o_years").value = years;
  f.docId("o_months").value = months;
  f.docId("o_days").value = days;
  if (months == 0 && days == 0) {
    f.docId("bday").innerHTML = "Happy Birthday!";
  }
}
function mod_change() {
  if (f.docId("mod").value == "other") {
    f.docId("i_mod").style.display = "block";
  } else {
    f.docId("i_mod").style.display = "none";
  }
}
function input_change() {
  if (f.docId("input_type").value == "bday") {
    f.docId("input_bday").style.display = "block";
    f.docId("input_age").style.display = "none";
  } else {
    f.docId("input_age").style.display = "block";
    f.docId("input_bday").style.display = "none";
  }
}