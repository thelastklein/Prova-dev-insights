let carList = []
let apiUrl =  'https://imdev.azurewebsites.net/vendarro'
let deleteId

let deleteYes = document.querySelector(".confirm-del-car-btn")
deleteYes.onclick = deletaCarro

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
           
    let modal = document.querySelector(".modal-container")
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


    let nomeCar = document.getElementById('car-model-input')
    nomeCar.value = `${carItem.modelo}`

    let valorCar = document.getElementById('car-value-input')
    valorCar.value = `${carItem.valor}`

    let descCar = document.getElementById('car-desc-input')
    descCar.value = `${carItem.descricao}`


    
    function atualizaCarro(){
        
        let formCar = document.getElementById('form-car')

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

        fecharModal()
        buscarApi()
        listaCarros()
    }

    let updateCar = document.querySelector(".submit-btn")
    updateCar.addEventListener("click", atualizaCarro)
}

function fecharModalEdita() {
 
    let modal = document.querySelector(".modal-container")
    modal.style.cssText += "transform: translateY(-150%); visibility: hidden"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "none"

    let body = document.querySelector("body")
    body.style.cssText = "overflow: auto"

}