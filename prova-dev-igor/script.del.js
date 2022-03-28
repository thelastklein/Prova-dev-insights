let carList = []
let apiUrl =  'https://imdev.azurewebsites.net/vendarro'

function buscarApi(){
   fetch(apiUrl + '/get-carros.php')
   .then(res => res.json())
   .then(data => { 
       carList = data
       console.log(carList)
       listaCarros(carList)
   } ) 
}

buscarApi()

function listaCarros() {
    let carTable = document.querySelector(".car-table")
    
    for(let i in carList) {
        carTable.innerHTML += `
        <tr>
            <td>${carList[i].modelo}</td>
            <td>R$ ${carList[i].valor}</td>
            <td>${carList[i].descricao}</td>
            <td>
                <button><img src="./assets/edit-icon.png"></button>
                <button><img src="./assets/delete-icon.png"></button>
            </td>
        </tr>
        `
    }

    console.log(carList)
}

listaCarros()

function deleteCarros() {
    
}