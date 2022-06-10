for(i=0; i<10; i++)
{
  let btn = document.getElementById(`numpad-${i}`);
  btn.addEventListener("click", () => 
  {
    addNumber(btn);
  })
}

let decimalInputBtn = document.getElementById("numpad-.");
decimalInputBtn.addEventListener("click", () =>
{
  addNumber(decimalInputBtn);
})


let resetInputBtn = document.getElementById("numpad-clear");
resetInputBtn.addEventListener("click", () =>
{
  resetInput();
})

let updateElement = document.getElementById("numpad-update");
console.log(typeof(document.getElementById("current")))
if(window.location.href.includes("usage"))
{
  updateElement.addEventListener("click", () =>
  {
    updateUsage();
  })
}
else
{
  updateElement.addEventListener("click", () =>
  {
    switchSelection();
  })
}




function addNumber(element) 
{
  let selectedElement = document.getElementsByClassName("active");
  console.table(selectedElement);
  selectedElement = selectedElement[1];
  selectedElement.value = selectedElement.value+element.value;
}

function resetInput() 
{
  let elements = document.getElementsByClassName("active");
  let selectedElement = elements[1];
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
  else if(typeof(updateUsageElement) != null && currentElement != null)
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

  if(window.location.href.includes("panels"))
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
  if ((document.getElementById("usage-update").value) != '')
  {
  let usage = parseFloat(document.getElementById("usage-update").value);
  LocalDataManager.setUsage(usage);
  window.location.href="panels.html";
  }
  else
  {
    let usage = 0;
    LocalDataManager.setUsage(usage);
    window.location.href="panels.html";
  }
}

// Whenever the submit button on the panels page is pressed check which input is active and trigger the appropriate update.
function switchSelection()
{
  let currentSelectedElement = document.getElementsByClassName("active");
  if (currentSelectedElement[1] == document.getElementById("update-area"))
  {
    currentSelectedElement[1].classList.remove("active");
    let newElement = document.getElementById("update-angle");
    newElement.classList.add("active");
    updateArea();
  }
  else if (currentSelectedElement[1] == document.getElementById("update-angle"))
  {
    currentSelectedElement[1].classList.remove("active");
    let newElement = document.getElementById("update-direction");
    newElement.classList.add("active");
    updateAngle();
  }
  else
  {
    updateDirection();
  }
}

function updateArea()
{
  if ((document.getElementById("update-area").value) != '')
  {
  let area = parseFloat(document.getElementById("update-area").value);
  LocalDataManager.setArea(area);
  }
  else
  {
    let area = 0;
    LocalDataManager.setArea(area);
  }
}

function updateAngle()
{
  if ((document.getElementById("update-angle").value) != '')
  {
    let angle = parseFloat(document.getElementById("update-angle").value);
    LocalDataManager.setAngle(angle);
  }
  else
  {
    let angle = 0;
    LocalDataManager.setAngle(angle);
  }
}

function updateDirection()
{
  if ((document.getElementById("update-angle").value) != '')
  {
    let direction = parseFloat(document.getElementById("update-direction").value);
    LocalDataManager.setDirection(direction);
    loadSavedInputs();
    window.location.href="daily.html";
  }
  else
  {
    let direction = 0;
    LocalDataManager.setDirection(direction);
    loadSavedInputs();
    window.location.href="daily.html";
  }
}

