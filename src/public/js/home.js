
const API_URL = window.location.protocol + '//' + window.location.host + '/' + "api/";
let cartId = sessionStorage.getItem("cart")
console.log(cartId)
function addProductToCart(pid, stock) {
    if( !cartId ){
        alert("You must be logged-in to add products into your cart")
    }
    const quantity = document.getElementById(`quantity_input_${pid}`).value;
    
    console.log(JSON.stringify(quantity))
    const url = `${API_URL}carts/${cartId}/products/${pid}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: quantity }),
    })
        .then(response => {
            if(response.ok){
                console.log("Product updated in cart")
            }
        })
        .catch(error => {
            console.log(error);
            displayModal("An error occurred while updating the product in the cart. Please try again later.")
        });
}


function displayModal(message) {
    const modal = document.getElementById("errorModal");
    const modalMessage = document.getElementById("modalErrorMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("errorModal");
    modal.style.display = "none";
}

function deleteProduct(pid) {
    const url = `${API_URL}products/${pid}`
    fetch(url, {
        method: "DELETE"
    })
        .then(response => {
            if(response.ok){
                alert("Product deleted")
                console.log("Product deleted succesfully")
            }
        }).catch(error => {
            alert(error.message)
            console.error(error)
        })
}

function toggleForm() {
    const formContainer = document.getElementById('formContainer');
    const productContainer = document.getElementById('productContainer');
    formContainer.style.display = "flex"
    if(productContainer){
        productContainer.style.display = "none"
    }
}

function submitForm(id) {
    const productContainer = document.getElementById('productContainer');
    const formContainer = document.getElementById('formContainer')
    const updatedTitle = document.getElementById('updateTitle').value;
    const updatedPrice = document.getElementById('updatePrice').value;
    const updatedDesc = document.getElementById('updateDesc').value;
    const updatedStock = document.getElementById('updateStock').value;
    const updatedCategory = document.getElementById('updateCategory').value;
    const updatedProduct = {
        title: updatedTitle,
        price: updatedPrice,
        desc: updatedDesc,
        stock: updatedStock,
        category: updatedCategory,
    }
    document.getElementById('title').innerText = updatedTitle;
    document.getElementById('price').innerText = `$${updatedPrice}`;
    document.getElementById('desc').innerText = updatedDesc;
    document.getElementById('stock').innerText = `Stock: ${updatedStock}`;
    document.getElementById('category').innerText = `Category: ${updatedCategory}`;

    fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    }).then(response => {
        if(response.ok){
            alert("Product updated")
            console.log("Product updated succesfully")
        }
    }).catch(error => {
        alert(error.message)
        console.error(error)
    })
    formContainer.style.display = "none"
    productContainer.style.display = "flex"
}


function hideForm(){
    const form = document.getElementById("formContainer")

    form.style.display = "none"
}

function submitProduct(){
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const desc = document.getElementById('desc').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const newProduct = {
        title: title,
        price: price,
        desc: desc,
        stock: stock,
        category: category,
    }
    fetch("/api/products", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    }).then(response => {
        if(response.ok){
            alert("Product submitted")
            console.log("Product submitted succesfully")
        }
    }).catch(error => {
        alert(error.message)
        console.error(error)
    })
    hideForm()
}


