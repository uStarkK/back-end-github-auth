
const API_URL = window.location.protocol + '//' + window.location.host + '/' + "api/";
let cartId = sessionStorage.getItem("cart")
console.log(cartId)
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





