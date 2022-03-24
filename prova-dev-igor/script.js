let carList = [
    {   
        id: 1,
        img: "./assets/gol.png",
        nome: "Gol",
        preco: "R$ 200",
        desc: "Carro Volkswagen Gol vermelho"
    },
    
    {
        id: 2,
        img: "./assets/celta.png",
        nome: "Celta",
        preco: "R$ 100",
        desc: "Chevrolet Celta preto"
    },

    {
        id: 3,
        img: "./assets/jaguar.png",
        nome: "Jaguar",
        preco: "R$ 500",
        desc: "Carro modelo Jaguar preto"
    },

    {
        id: 4,
        img: "./assets/fusca.png",
        nome: "Fusca",
        preco: "R$ 300",
        desc: "Fusca azul"
    },
    {
        id: 5,
        img: "./assets/fusca.png",
        nome: "Fusca 2",
        preco: "R$ 300",
        desc: "Fusca azul"
    },

]

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
    modalImg.setAttribute("src", cardModal.img)

    let modalName = document.querySelector('.modal-name')
    modalName.innerHTML = `${cardModal.nome}`

    let modalPrice = document.querySelector('.modal-price')
    modalPrice.innerHTML = `${cardModal.preco}`

    let modalDesc = document.querySelector('.modal-desc')
    modalDesc.innerHTML = `${cardModal.desc}`
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
                    <img class="car-img" src = ${carResult[i].img} alt="Carro">
                    <p class="car-name" data-name=${carResult[i].nome}>${carResult[i].nome}</p>
                    <p class="car-price">${carResult[i].preco}</p>
                
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
        return carList.nome.toLowerCase().includes(carro)
    })
    
    if (carResult.length >= 1) {
        exibeCarro(carResult)

    } else {
        exibeCarro(carList)
    }
}

exibeCarro(carList)


window.addEventListener("keyup", (e) =>{
    if(e.key == "Escape") {
        fecharModal()
    }
})

