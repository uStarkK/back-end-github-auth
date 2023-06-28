const API_URL = window.location.protocol + '//' + window.location.host + '/' + "api/";
console.log(API_URL)
let cartId = localStorage.getItem("cartId")
if (!cartId) {
    fetch("http://localhost:8080/api/carts", { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            cartId = data._id
            localStorage.setItem("cartId", cartId)
        }

        ).catch(error => {
            console.error("Error:", error)
        })

}



function addProductToCart(pid) {
        const url = `${API_URL}carts/${cartId}/products/${pid}`;
        fetch(url, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }





