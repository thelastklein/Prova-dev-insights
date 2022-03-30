

function getCarId() {
    let tableRow = document.querySelectorAll(".table-element")
    tableRow.forEach(row => {   
        row.onclick = () => {
            let idCarro = row.getAttribute('data-id')
            editaCarro(idCarro)
            
        }
    })
    
}

function editaCarro(idCarro) {
    let carItem = carList.find(car => car.id == idCarro)

        
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
}