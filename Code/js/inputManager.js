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

  if(typeof(document.getElementById("current")) != 'undefined' && document.getElementById("current") != null && !isNaN(usage))
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
  else if(typeof(document.getElementById("update-usage")) != 'undefined' && document.getElementById("current") != null)
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

  if(typeof(document.getElementById("update-area")) != 'undefined' && document.getElementById("update-area") != null)
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

function inputLocation(latitude, longitude, cityName)
{
  LocalDataManager.setLocation(latitude, longitude);
  LocalDataManager.setCity(cityName);
  location.replace("usage.html");
}