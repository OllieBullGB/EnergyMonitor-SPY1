const nameCoordinates = 
{
    "Weipa": "-12.239544192990605 141.76575727708516",
    "Wenlock": "-13.094726954692797 142.98822515904797",
    "Coen": "-13.944659266250056 143.19874893205477",
    "Lakefield": "-14.911126916995045 144.2170719168139",
    "Cairns": "-16.87525210522903 145.75642621366043",
    "Kowanyama": "-15.45016757550798 141.74984882000314"
};

let locations = document.getElementsByTagName("li");
for(i = 0; i < locations.length; i++)
{
    let location = locations[i];
    location.addEventListener("click", () => 
    {
        let coords = nameCoordinates[location.id].split(" ");
        inputLocation(coords[0], coords[1], location.id);
    })
}

function inputLocation(latitude, longitude, cityName)
{
  LocalDataManager.setLocation(latitude, longitude);
  LocalDataManager.setCity(cityName);
  location.replace("usage.html");
}