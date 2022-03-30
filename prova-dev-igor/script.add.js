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
            
    function redirect() {
        return document.location.href="/prova-dev-igor"
    }


 
}

function validar() {
    let modelo = document.querySelector('#car-model-input')
    let valor = document.querySelector('#car-value-input')
    let desc = document.querySelector('#car-desc-input')
    let validadeModel = document.querySelector(".validade-modelo")
    let validadeValor = document.querySelector(".validade-valor")
    let validadeDesc = document.querySelector(".validade-desc")
    let validadeImg = document.querySelector(".validade-img")

    let Img = document.querySelector("#car-img-input")
    let files = Img.files
    
    if(modelo.value == "") {
        validadeModel.textContent = "Atenção este campo é obrigatório"
    } if(valor.value == ""){
        validadeValor.textContent = "Atenção este campo é obrigatório"
    } if(desc.value == ""){
        validadeDesc.textContent = "Atenção este campo é obrigatório"
    } if(files.length == 0){
        validadeImg.textContent = "Por favor escolha uma imagem!"
    } else {
        novoCarro()
    }
}

let inputFile = document.getElementById("car-img-input")
let fileNameField = document.getElementById("file-name")

inputFile.addEventListener('change', (e) =>{
    let uploadedFileName = e.target.files[0].name
    fileNameField.textContent = uploadedFileName;
})

