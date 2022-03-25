function novoCarro(){

    let formCar = document.getElementById('form-car')

    let formData = new FormData(formCar)

    let url = "https://imdev.azurewebsites.net/vendarro/create-carro.php"


    fetch(url, {
        method: "POST",
        body: formData
     })
     .then(res => res.json())
     .catch(error => alert(error))
 
}

