const API_URL = window.location.protocol + '//' + window.location.host + '/' + "api/";
let cartId = sessionStorage.getItem("cart")
if (!sessionStorage.getItem("cart")) {
    fetch("http://localhost:8080/api/sessions/current", { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            cartId = data.user.cartId._id
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
