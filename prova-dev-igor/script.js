 let carList = []
 let apiUrl =  'https://imdev.azurewebsites.net/vendarro'

function buscarApi(){
    fetch(apiUrl + '/get-carros.php')
    .then(res => res.json())
    .then(data => { 
        carList = data
        exibeCarro(carList)
        console.log(carList)
    } ) 
}

buscarApi()



function exibeModal(idCarro) {
    
    let cardModal = carList.find(card => card.id == idCarro)

    
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

    let modalImg = document.querySelector('.modal-img')
    modalImg.setAttribute("src", `${apiUrl}/${cardModal.filePath}`)

    let modalName = document.querySelector('.modal-name')
    modalName.innerHTML = `${cardModal.modelo}`

    let modalPrice = document.querySelector('.modal-price')
    modalPrice.innerHTML = `R$ ${cardModal.valor}`

    let modalDesc = document.querySelector('.modal-desc')
    modalDesc.innerHTML = `${cardModal.descricao}`
}

function fecharModal() {
 
    let modal = document.querySelector(".modal-container")
    modal.style.cssText += "transform: translateY(-150%); visibility: hidden"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "none"

    let body = document.querySelector("body")
    body.style.cssText = "overflow: auto"

}


function exibeCarro(carResult) {

    let carCount = document.getElementById("car-count")
    carCount.innerHTML = "Carros encontrados: "
    carCount.innerHTML += carResult.length

    let carContainer = document.getElementById("car-container")
    carContainer.innerHTML = ""
    
    for (let i in carResult) {
            carContainer.innerHTML += `
                <div class="card-container" data-id=${carResult[i].id}>
                    <img class="car-img" src = ${apiUrl}/${carResult[i].filePath} alt="Carro">
                    <p class="car-name" data-name=${carResult[i].modelo}>${carResult[i].modelo}</p>
                    <p class="car-price">R$ ${carResult[i].valor}</p>
                
                </div>`     
    }
    
    let cardContainer = document.querySelectorAll(".card-container")
    cardContainer.forEach(card => {
        card.onclick = () => {
            let idCarro = card.getAttribute('data-id')
            exibeModal(idCarro)
        }
    })

}

function pesquisaCarro() {
    let carro = document.getElementById("input").value.toLowerCase()


    let carResult = carList.filter(function resultadoCarro(carList){
        return carList.modelo.toLowerCase().includes(carro)
    })
    
    if (carResult.length >= 1) {
        exibeCarro(carResult)

    } else {
        exibeCarro(carList)
    }
}



window.addEventListener("keyup", (e) =>{
    if(e.key == "Escape") {
        fecharModal()
    }
})

