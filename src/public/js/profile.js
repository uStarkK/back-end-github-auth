const API_URL = window.location.protocol + '//' + window.location.host + '/' + "api/";
let cartId = sessionStorage.getItem("cart")
if (!sessionStorage.getItem("cart")) {
    const url = API_URL + "sessions/current"
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            cartId = data.user.cart._id
            sessionStorage.setItem("cart", cartId)
            console.log(cartId)
            return cartId
        }

        ).catch(error => {
            console.error("Error:", error)
        })

}else{
    cartId = sessionStorage.getItem("cart")
}



function showTickets(){
    const ticketsContainer = document.getElementById("tickets_container")

    ticketsContainer.style.display = ticketsContainer.style.display === "block"? "none" : "block"
}