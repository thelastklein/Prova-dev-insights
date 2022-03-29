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
    
    for(let i in carList) {
        carTable.innerHTML += `
        <tr class="table-element" data-id=${carList[i].id}>
        <td>${carList[i].id}</td>
        <td>${carList[i].modelo}</td>
        <td>R$ ${carList[i].valor}</td>
        <td>${carList[i].descricao}</td>
        <td>
        <button class="edit-btn"><img src="./assets/edit-icon.png" class="edit-img"></button>
        <button class="del-btn" onclick="getCarId()" type="button"><img src="./assets/delete-icon.png" class="del-img"></button>
        </td>
        </tr> `
    }
   
} 

function getCarId() {
    let tableRow = document.querySelectorAll(".table-element")
        tableRow.forEach(row => {   
            row.onclick = () => {
                let idCarro = row.getAttribute('data-id')
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

}
