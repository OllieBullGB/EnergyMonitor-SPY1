/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


function addNumber(element) 
{
  let selectedElement = document.getElementsByClassName("selected");
  selectedElement = selectedElement[0];
  selectedElement.value = selectedElement.value+element.value;
}

function switchSelection(elementName)
{
  let currentSelectedElement = document.getElementsByClassName("selected");
  currentSelectedElement[0].classList.remove("selected");
  
  let newElement = document.getElementById(elementName);
  newElement.classList.add("selected");
}

function reset() 
{
  let elements = document.getElementsByClassName("selected");
  console.table(elements);
  let selectedElement = elements[0];
  selectedElement.value = "";
}

function updateUsage()
{
  let usage = parseFloat(document.getElementById("update-input").value);
  LocalDataManager.setUsage(usage);
}

function updateArea()
{
  let area = parseFloat(document.getElementById("update-area").value);
  LocalDataManager.setArea(area);
  switchSelection("update-angle");
}

function updateAngle()
{
  let angle = parseFloat(document.getElementById("update-angle").value);
  LocalDataManager.setAngle(angle);
  switchSelection("update-direction");
}

function updateDirection()
{
  let direction = parseFloat(document.getElementById("update-direction").value);
  LocalDataManager.setDirection(direction);
  //redirect to next page
}