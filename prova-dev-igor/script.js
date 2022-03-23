let carList = [
    {   
        id: 1,
        img: "./assets/gol.png",
        nome: "Gol",
        preco: "R$ 200"
    },

    {
        id: 2,
        img: "./assets/gol.png",
        nome: "Gol 2",
        preco: "R$ 200"
    },
    
    {
        id: 3,
        img: "./assets/celta.png",
        nome: "Celta",
        preco: "R$ 100"
    },

    {
        id: 4,
        img: "./assets/jaguar.png",
        nome: "Jaguar",
        preco: "R$ 500"
    },

    {
        id:5,
        img: "./assets/fusca.png",
        nome: "Fusca 1",
        preco: "R$ 300"
    },

    {
        id:6,
        img: "./assets/fusca.png",
        nome: "Fusca 2",
        preco: "R$ 3000"
    },

    {
        id:7,
        img: "./assets/fusca.png",
        nome: "Fusca 3",
        preco: "R$ 2500"
    }
]

function exibeModal(idCarro) {
    console.log(idCarro)
    let modal = document.querySelector(".modal-container")
    modal.style.display = "flex"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "flex"


    modal.innerHTML = ""

    modal.innerHTML += `
        <div class="bg-close"> <p class="close-btn" onclick="fecharModal()">X</p> </div>
        <img class="modal-img" src= "assets/jaguar.png"  alt="Carro">
        <p class="modal-name">Jaguar Fake</p>
        <p class="modal-price">R$ 5000</p>
        <p class="modal-desc">Lorem Jaguar lorem lorem carro barato e rapido lorem</p>
        <button class="buy-btn">Comprar Agora</button>
    `
}

function fecharModal() {
    let modal = document.querySelector(".modal-container")
    modal.style.display = "none"

    let bg_modal = document.querySelector(".bg-modal")
    bg_modal.style.display = "none"

}


function exibeCarro(carResult) {

    let carContainer = document.getElementById("car-container")
    carContainer.innerHTML = ""
    
    for (let i in carResult) {
            carContainer.innerHTML += `
                <div class="card-container" data-id=${carResult[i].id}>
                    <img class="car-img" src = ${carResult[i].img} alt="Carro">
                    <p class="car-name">${carResult[i].nome}</p>
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




