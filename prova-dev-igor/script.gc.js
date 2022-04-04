let carList = []
let apiUrl =  'https://imdev.azurewebsites.net/vendarro'
let deleteId

let deleteYes = document.querySelector(".confirm-del-car-btn")
deleteYes.onclick = deletaCarro

let inputFile = document.getElementById("car-img-input")
let fileNameField = document.getElementById("file-name")

inputFile.addEventListener('change', (e) =>{
    let uploadedFileName = e.target.files[0].name
    fileNameField.textContent = uploadedFileName;
})

let editInputFile = document.getElementById("car-edit-img-input")
let editFileNameField = document.getElementById("edit-file-name")

editInputFile.addEventListener('change', (e) =>{
    let uploadedEditFileName = e.target.files[0].name
    editFileNameField.textContent = uploadedEditFileName;
})

let addCar = document.querySelector(".submit-add-btn")
addCar.addEventListener("click", validarAdd)

let addBtn = document.querySelector(".add-btn")
addBtn.addEventListener("click", abrirModalAdd)

let bgModal = document.querySelector(".bg-modal")
bgModal.addEventListener("click", () => {
    fecharModalAdd()
    fecharModalDeleta()
    fecharModalEdita()
})

let closeModalBtnAdd = document.querySelector(".close-btn")
closeModalBtnAdd.addEventListener("click", fecharModalAdd)

let closeModalBtnEdit = document.querySelector(".close-btn-edit")
closeModalBtnEdit.addEventListener("click", fecharModalEdita)

let cancelDelCar = document.querySelector(".cancel-del-car-btn")
cancelDelCar.addEventListener("click", fecharModalDeleta)


function buscarApi(){
   fetch(apiUrl + '/get-carros.php')
   .then(res => res.json())
   .then(data => { 
       carList = data
       listaCarros(carList)
   } ) 
}

buscarApi()


function abrirModalAdd() {
    let modal = document.querySelector(".add-modal")
    modal.style.cssText += "transform: translateY(0%); visibility: visible"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "flex"


    let body = document.querySelector("body")
    body.style.cssText = "overflow: hidden"

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

}

function fecharModalAdd() {
    let modal = document.querySelector(".add-modal")
    modal.style.cssText += "transform: translateY(-150%); visibility: hidden"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "none"

    let body = document.querySelector("body")
    body.style.cssText = "overflow: auto"

    let nomeCar = document.getElementById('car-model-input')
    nomeCar.value = ""

    let valorCar = document.getElementById('car-value-input')
    valorCar.value = ""

    let descCar = document.getElementById('car-desc-input')
    descCar.value = ""

    let validadeModel = document.querySelector(".validade-modelo")
    let validadeValor = document.querySelector(".validade-valor")
    let validadeDesc = document.querySelector(".validade-desc")
    let validadeImg = document.querySelector(".validade-img")

    validadeModel.textContent = ""
    validadeValor.textContent = ""
    validadeDesc.textContent = ""
    validadeImg.textContent = ""

}

function adicionaCarro() {
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
                 alert("Carro adicionado com sucesso!!"))
            })
            .catch(Error => alert(Error))
            
            fecharModalAdd()
}

function validarAdd() {
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
        adicionaCarro()
        buscarApi()
    }
}


function listaCarros() {
    let carTable = document.querySelector(".car-table")
    carTable.innerHTML = `
    <table class="car-table container">
        <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Ação</th>
        </tr>
    </table>
    `    
    for(let i in carList) {
        carTable.innerHTML += `
        <tr class="table-element">
        <td>${carList[i].id}</td>
        <td>${carList[i].modelo}</td>
        <td>R$ ${carList[i].valor}</td>
        <td>${carList[i].descricao}</td>
        <td class="btn-col">
        <button class="edit-btn" data-id=${carList[i].id}><img src="./assets/edit-icon.png" class="edit-img"></button>
        <button class="open-del-confirm" data-id=${carList[i].id}><img src="./assets/delete-icon.png" class="del-img"></button>
        </td>
        </tr> `
    }
   
    
        let tableEditBtn = document.querySelectorAll(".edit-btn")
            tableEditBtn.forEach(btn => {   
                btn.onclick = () => {
                    let idCarro = btn.getAttribute('data-id')
                    editaCarro(idCarro)
                }
            })

        let tableDeleteBtn = document.querySelectorAll(".open-del-confirm")
            tableDeleteBtn.forEach(btn => {   
                btn.onclick = () => {
                    deleteId = btn.getAttribute('data-id')
                    abrirModalDeleta()
                }
            })
            
}


listaCarros()

function abrirModalDeleta() {
    let modal = document.querySelector(".delete-modal")
    modal.style.cssText += "transform: translateY(0%); visibility: visible"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "flex"


    let body = document.querySelector("body")
    body.style.cssText = "overflow: hidden"

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

}


function fecharModalDeleta(){
    let modal = document.querySelector(".delete-modal")
    modal.style.cssText += "transform: translateY(-150%); visibility: hidden"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "none"

    let body = document.querySelector("body")
    body.style.cssText = "overflow: auto"
}

function deletaCarro() {

    let carItem = carList.find(car => car.id == deleteId)
    
    console.log(carItem.id)

    let form = new FormData()
    form.append('id', carItem.id)
     

    fetch('https://imdev.azurewebsites.net/vendarro/delete-carro.php', {
        method: "POST",
        body: form
    })
.then(res => res.json())
.then(data => {
    buscarApi()
    fecharModalDeleta()
    
})


}

function editaCarro(idCarro) {
    let carItem = carList.find(car => car.id == idCarro)

    abrirModalEdita(carItem)
}


function abrirModalEdita(carItem) {
           
    let modal = document.querySelector(".edit-modal")
    modal.style.cssText += "transform: translateY(0%); visibility: visible"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "flex"


    let body = document.querySelector("body")
    body.style.cssText = "overflow: hidden"

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })


    let nomeCar = document.getElementById('edit-car-model-input')
    nomeCar.value = `${carItem.modelo}`

    let valorCar = document.getElementById('edit-car-value-input')
    valorCar.value = `${carItem.valor}`

    let descCar = document.getElementById('edit-car-desc-input')
    descCar.value = `${carItem.descricao}`

    let updateCar = document.querySelector(".submit-edit-btn")
    updateCar.addEventListener("click", validarEdit)

    function validarEdit() {
        
        let modelo = document.querySelector('#edit-car-model-input')
        let valor = document.querySelector('#edit-car-value-input')
        let desc = document.querySelector('#edit-car-desc-input')
        let validadeModel = document.querySelector(".edit-validade-modelo")
        let validadeValor = document.querySelector(".edit-validade-valor")
        let validadeDesc = document.querySelector(".edit-validade-desc")
        let validadeImg = document.querySelector(".edit-validade-img")

        let Img = document.querySelector("#car-edit-img-input")
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
           atualizaCarro()
        }
    }


    function atualizaCarro(){
        
        let formCar = document.getElementById('edit-form-car')

        let formData = new FormData(formCar)
        formData.append('id', carItem.id)
        console.log(formData)

        let url = "https://imdev.azurewebsites.net/vendarro/update-carro.php"


        fetch(url, {
            method: "POST",
            body: formData
         })
        .then(res => {
             if(!res.ok) {
                throw Error('Preencha todo o formulário corretamente')
            }
                return (
                    alert("Carro atualizado com sucesso!!"))
                })
                .catch(Error => alert(Error))

        fecharModalEdita()
        buscarApi()
    }

}

function fecharModalEdita() {
 
    let modal = document.querySelector(".edit-modal")
    modal.style.cssText += "transform: translateY(-150%); visibility: hidden"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "none"

    let body = document.querySelector("body")
    body.style.cssText = "overflow: auto"

    let validadeModel = document.querySelector(".edit-validade-modelo")
    let validadeValor = document.querySelector(".edit-validade-valor")
    let validadeDesc = document.querySelector(".edit-validade-desc")
    let validadeImg = document.querySelector(".edit-validade-img")

    validadeModel.textContent = ""
    validadeValor.textContent = ""
    validadeDesc.textContent = ""
    validadeImg.textContent = ""

}