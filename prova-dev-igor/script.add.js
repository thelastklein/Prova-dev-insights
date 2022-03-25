function novoCarro(){
    let carModel = document.getElementById('car-model-input').value
    let carValue = document.getElementById('car-value-input').value
    let carDesc = document.getElementById('car-desc-input').value
    let carImg = document.getElementById('car-img-input')


    let url = "https://imdev.azurewebsites.net/vendarro/create-carro.php"


    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "modelo-carro": carModel,
            "valor-carro": carValue,
            "description-carro": carDesc,
            "file-carro": carImg.files[0]
        }),
        // headers:{
        //     "content-Type": "application/json; charset=UTF-8"
        // }
     }).then(res => res.json()).then(data => console.log(data))
 
}

