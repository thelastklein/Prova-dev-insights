function novoCarro(){

    let formCar = document.getElementById('form-car')

    let formData = new FormData(formCar)
    console.log(formData)

    let url = "https://imdev.azurewebsites.net/vendarro/create-carro.php"


    fetch(url, {
        method: "POST",
        body: formData
     })
     .then(res => {
         if(!res.ok) {
             throw Error('Preencha todo o formulário corretamente')
         }
             return (
                 alert("Carro adicionado com sucesso!!"),
                 setTimeout(redirect,1000))
            })
            .catch(Error => alert(Error))
            
    // function redirect() {
    //     return document.location.href="/prova-dev-igor"
    // }


 
}

let inputFile = document.getElementById("car-img-input")
let fileNameField = document.getElementById("file-name")

inputFile.addEventListener('change', (e) =>{
    let uploadedFileName = e.target.files[0].name
    fileNameField.textContent = uploadedFileName;
})

