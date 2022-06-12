/* Set date to today for Today View navigation link */
var link = "hourly.html?day=\""

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear() - 2000;

if (dd < 10) {
  dd = '0' + dd
}

if (mm < 10) {
  m = '0' + mm
}

var today = mm + '/' + dd + '/' + yyyy + '"';

document.getElementById("hourly-link").href = link.concat(today);