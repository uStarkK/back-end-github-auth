const API_URL = window.location.protocol + '//' + window.location.host + '/' + "api/";
let cartId = sessionStorage.getItem("cart")

function finishPurchase() {
    const url = `${API_URL}carts/${cartId}/purchase`
    fetch(url, {
        method: "PUT"
    }).then(response => response.json())
    .then(data => {
        // Handle the response data
        console.log(data);
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
}

function deleteFromCart(pid) {
    const url = `${API_URL}carts/${cartId}/products/${pid}`
    fetch(url, {
        method: "DELETE"
    }).then(response => response.json())
    .then(data => {
        // Handle the response data
        console.log(data);
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
}