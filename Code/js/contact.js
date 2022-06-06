function contact()
{
    let formData = new FormData();
    formData.append("name", document.getElementById("name").innerHTML);
    formData.append("email", document.getElementById("email").innerHTML);
    formData.append("subject", document.getElementById("subject"));
    formData.append("message", document.getElementById("message"));

    fetch("/api/contact", 
    {
        method: "post",
        mode: "no-cors",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}