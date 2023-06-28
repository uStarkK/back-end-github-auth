const productForm = document.getElementById('product-form');
const socket = io()
const productListContainer = document.getElementById('product_list')

function deleteProductWithSocket(id) {
    socket.emit('product:delete', id)
}

async function deleteProduct(id) {
    const response = await fetch(`/api/products/${id}`, {
        method: 'delete'
    })

    if (response.ok) {
        const li = document.querySelector(`li[data-product-id="${id}"]`);
        if (li) {
            li.remove();
        }
    } else {
        alert('Could not delete product');
    }
}


try {

    socket.on('connect', () => {
        console.log('Conexion establecida con el servidor')
    })

    socket.on('product:created', product => {
        const li = `
    <li id="${product.id}">
        <div>
        <p>${product.title}</p>
        <button onclick="deleteProductWithSocket('${product.id}')">Delete</button>
        </div>
    </li>`
        productListContainer.innerHTML += li
    })

    socket.on('product:deleted', (id) => {
        const li = document.createElement('li');
        li.setAttribute('data-product-id', product.id);
        li.remove()
    })


    productForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const desc = document.getElementById('description').value;
        const price = document.getElementById('price').value;

        const newProduct = {
            title,
            desc,
            price
        }
        console.log(newProduct);
        socket.emit("product:create", newProduct);
        productForm.reset()
    });
} catch (error) { }





