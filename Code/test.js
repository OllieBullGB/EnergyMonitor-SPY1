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

function resetInput() 
{
  let elements = document.getElementsByClassName("selected");
  let selectedElement = elements[0];
  selectedElement.value = selectedElement.value.slice(0, -1);
}

function loadSavedInputs()
{
  let usage = LocalDataManager.getUsage().usage;
  let panelInfo = LocalDataManager.getPanelInfo();

  if(document.getElementById("update-usage").classList.length > 0 && !isNaN(usage))
  {
    document.getElementById("current").innerHTML = 
    `
    <var> ${usage} </var>
    <p>
      kWh
      <span class="material-symbols-outlined">
        bolt
      </span>
    </p>
    `
  }
  else if(document.getElementById("update-usage").classList.length > 0)
  {
    document.getElementById("current").innerHTML = 
    `
    <var> 0 </var>
    <p>
      kWh
      <span class="material-symbols-outlined">
        bolt
      </span>
    </p>
    `
  }

  if(document.getElementById("update-area").classList.length > 0)
  {
    if(!isNaN(panelInfo.area) && panelInfo.area > 0)
    {
      document.getElementById("update-area").value = panelInfo.area;
    }
    if(!isNaN(panelInfo.angle) && panelInfo.angle > 0)
    {
      document.getElementById("update-angle").value = panelInfo.angle;
    }
    if(!isNaN(panelInfo.direction) && panelInfo.direction > 0)
    {
      document.getElementById("update-direction").value = panelInfo.direction;
    }
  }
}

loadSavedInputs();

function updateUsage()
{
  let usage = parseFloat(document.getElementById("usage-update").value);
  LocalDataManager.setUsage(usage);
  loadSavedInputs();
}

function updateArea()
{
  let area = parseFloat(document.getElementById("update-area").value);
  LocalDataManager.setArea(area);
  switchSelection("update-angle");
  loadSavedInputs();
}

function updateAngle()
{
  let angle = parseFloat(document.getElementById("update-angle").value);
  LocalDataManager.setAngle(angle);
  switchSelection("update-direction");
  loadSavedInputs();
}

function updateDirection()
{
  let direction = parseFloat(document.getElementById("update-direction").value);
  LocalDataManager.setDirection(direction);
  window.location.href="daily.html";
}