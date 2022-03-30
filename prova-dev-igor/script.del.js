let carList = []
let apiUrl =  'https://imdev.azurewebsites.net/vendarro'

function buscarApi(){
   fetch(apiUrl + '/get-carros.php')
   .then(res => res.json())
   .then(data => { 
       carList = data
       listaCarros(carList)
   } ) 
}

buscarApi()





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
        <button class="del-btn" data-id=${carList[i].id}><img src="./assets/delete-icon.png" class="del-img"></button>
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

        let tableDeleteBtn = document.querySelectorAll(".del-btn")
            tableDeleteBtn.forEach(btn => {   
                btn.onclick = () => {
                    let idCarro = btn.getAttribute('data-id')
                    deletaCarro(idCarro)
                }
            })
            
}




listaCarros()

function deletaCarro(idCarro) {

    let carItem = carList.find(car => car.id == idCarro)
    
    console.log(carItem.id)

    let form = new FormData()
    form.append('id', carItem.id)
     

    fetch('https://imdev.azurewebsites.net/vendarro/delete-carro.php', {
        method: "POST",
        body: form
    })
.then(res => res.json())
.then(data => console.log(data))

listaCarros()

}

function editaCarro(idCarro) {
    let carItem = carList.find(car => car.id == idCarro)

    exibeModal(carItem)
}

function exibeModal(carItem) {
           
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
}

function fecharModal() {
 
    let modal = document.querySelector(".modal-container")
    modal.style.cssText += "transform: translateY(-150%); visibility: hidden"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "none"

    let body = document.querySelector("body")
    body.style.cssText = "overflow: auto"

}