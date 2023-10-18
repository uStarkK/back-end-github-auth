const API_URL = window.location.protocol + '//' + window.location.host + '/' + "api/";
let cartId = sessionStorage.getItem("cart")
function finishPurchase() {
    const url = `${API_URL}carts/${cartId}/purchase`
    fetch(url, {
        method: "PUT"
    }).then(response => response.json())
        .then(data => {
            // Handle the response data
            alert(JSON.stringify(data.msg))
            console.log(JSON.stringify(data));
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
            alert(error.message)
        });
}

function deleteFromCart(pid) {
    const url = `${API_URL}carts/${cartId}/products/${pid}`
    fetch(url, {
        method: "DELETE"
    })
    alert("Product removed from cart");
    location.reload()
    return false;
}


async function clearCart(){
    const url = `${API_URL}carts/${cartId}`
    fetch(url, {
        method: "DELETE"
    })
    alert("Cart Cleared")
    location.reload()
}

document.addEventListener('input', function(event) {
    if (event.target.id && event.target.id.startsWith('quantity_input')) {
        const inputElement = event.target;
        const pid = inputElement.id.split('_')[2]; // Extract pid from the element's id

        const maxValue = parseInt(inputElement.getAttribute('max'), 10);
        const parsedValue = parseInt(inputElement.value, 10);

        if (parsedValue > maxValue) {
            inputElement.value = maxValue;
        }
    }
});

async function handleInput(pid) {
    const quantity = document.getElementById(`quantity_input_cart_${pid}`).value;
    const url = `${API_URL}carts/${cartId}/products/${pid}`
    console.log(quantity)
    if (quantity > 0) {
        try {
            const response = await fetch(url, {
                method: 'PUT', // Or any other appropriate method
                headers: {
                    'Content-Type': 'application/json' // Set the appropriate content type
                },
                body: JSON.stringify({ quantity: quantity }) // Send the new quantity in the request body
            });

            // Check if the request was successful
            if (response.ok) {
                console.log('Quantity updated successfully');
            } else {
                console.error('Failed to update quantity');
            }
        } catch (error) {
            alert("Error", error.message)
            console.error('Error:', error);
        }
        ;
    }else{
        try{
            await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response =>{
                if(response.ok){
                    alert("Product removed from cart")
                }else{
                    alert("Product could not be removed from cart due to an error")
                    console.error("Error removing product")
                }
            })
        }
        catch(e){
            console.error(e.message)
        }
    }


}

