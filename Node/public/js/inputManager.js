function addNumber(element) 
{
  let selectedElement = document.getElementsByClassName("selected");
  selectedElement = selectedElement[0];
  selectedElement.value = selectedElement.value+element.value;
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

  let currentElement = document.getElementById("current");
  let updateUsageElement = document.getElementById("update-usage");
  if(typeof(currentElement) != 'undefined' && currentElement != null && !isNaN(usage))
  {
    currentElement.innerHTML = 
    `
    <var> ${usage} </var>
    <p>
      kWh
      <span class="material-symbols-outlined">
        bolt
      </span>
    </p>
    `
    updateUsageElement.value = usage;
  }
  else if(typeof(updateUsageElement) != 'undefined' && currentElement != null)
  {
    currentElement.innerHTML = 
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

  let updateAreaElement = document.getElementById("update-area");

  if(typeof(updateAreaElement) != 'undefined' && updateAreaElement != null)
  {
    if(!isNaN(panelInfo.area) && panelInfo.area > 0)
    {
      updateAreaElement.value = panelInfo.area;
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
  window.location.href="panels.html";
}

// Whenever the submit button on the panels page is pressed check which input is selected and trigger the appropriate update.
function switchSelection()
{
  let currentSelectedElement = document.getElementsByClassName("selected");
  if (currentSelectedElement[0] == document.getElementById("update-area"))
  {
    currentSelectedElement[0].classList.remove("selected");
    let newElement = document.getElementById("update-angle");
    newElement.classList.add("selected");
    updateArea();
  }
  else if (currentSelectedElement[0] == document.getElementById("update-angle"))
  {
    currentSelectedElement[0].classList.remove("selected");
    let newElement = document.getElementById("update-direction");
    newElement.classList.add("selected");
    updateAngle();
  }
  else
  {
    updateDirection();
  }
}

function updateArea()
{
  let area = parseFloat(document.getElementById("update-area").value);
  LocalDataManager.setArea(area);
}

function updateAngle()
{
  let angle = parseFloat(document.getElementById("update-angle").value);
  LocalDataManager.setAngle(angle);
}

function updateDirection()
{
  let direction = parseFloat(document.getElementById("update-direction").value);
  LocalDataManager.setDirection(direction);
  loadSavedInputs();
  window.location.href="daily.html";
}

function inputLocation(latitude, longitude, cityName)
{
  LocalDataManager.setLocation(latitude, longitude);
  LocalDataManager.setCity(cityName);
  location.replace("usage.html");
}