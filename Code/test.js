/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


function addNumber(element) {
  document.getElementById("update-input").value = document.getElementById("update-input").value+element.value;
}

function reset() {
  document.getElementById("usage").value.clear;
}

function updateUsage()
{
  let usage = parseFloat(document.getElementById("update-input").value);
  LocalDataManager.setUsage(usage);
}