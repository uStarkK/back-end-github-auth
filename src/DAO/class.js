import fs from "fs";
export class ProductManager {
    constructor(path) {
        this.path = path
    }


    //Saves a new product
    async saveProduct(object) {
        try {
            const data = await this.getAll()
            let id;
            data.length === 0 ?
                (id = 1)
                :
                (id = data[data.length - 1].id + 1);
            const newProduct = { ...object, id };
            data.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 4), "utf-8")
            return newProduct
        }

        catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }


    //Returns a product based on its ID
    async getProductByid(id) {
        try {
            const data = await this.getAll()
            const obj = data.find(element => element.id === id)
            if (!obj) {
                return "The specified id does not belong to any existing product. Either the id is wrong or the product does not exist"
            }
            return obj
        }
        catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }

    //Updates a product based on its ID
    async updateProduct(id, newObject) {
        try {
            const data = await this.getAll()
            const obj = data.find(element => element.id == id)
            console.log(id)
            if (!obj) {
                return "The specified id does not belong to any existing product. Either the id is wrong or the product does not exist"
            } else {
                Object.assign(obj, { ...newObject, id: obj.id, code: obj.code })
                await fs.promises.writeFile(this.path, JSON.stringify(data, null, 4), "utf-8");
                return "Product updated succesfully";
            }
        }
        catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }

    //Returns all existing products
    async getAll() {
        if (!fs.existsSync("./products.json")) {
            fs.writeFileSync("products.json", "[]", "utf-8");
        } else {
            const read = await fs.promises.readFile(this.path, "utf-8");
            const data = read ? JSON.parse(read) : [];
            return data
        }

    }

    //Deletes a product based on its ID
    async deleteProduct(id) {
        try {
            let read = await this.getAll()
            let item = read.find((element) => element.id == id);
            let index = item ? read.indexOf(item) : -1;
            if (index >= 0) {
                read.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(read, null, 4), "utf-8");
            }
        } catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }

    //Deletes all products
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 4), "utf-8")
        } catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }
}

//End of ProductManager
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Beginning of CartManager 

export class CartManager {
    constructor(path) {
        this.path = path;
    }

    async saveCart(object) {
        try {
            const data = await this.getAll()
            let id;
            data.length === 0 ?
                (id = 1)
                :
                (id = data[data.length - 1].id + 1);
            const newCart = { ...object, id };
            data.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 4), "utf-8")
            return newCart
        }

        catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }

    async getCartByid(id) {
        try {
            const data = await this.getAll()
            const obj = data.find(element => element.id === id)
            if (!obj) {
                return "The specified id does not belong to any existing Cart. Either the id is wrong or the Cart does not exist"
            }
            return obj
        }
        catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }

    async updateCart(cartId, productId) {
        try {
            const dataCarts = await this.getAll()
            const read = await fs.promises.readFile("./products.json", "utf-8");
            const dataProducts = read ? JSON.parse(read) : [];
            const cart = dataCarts.find(element => element.id == cartId)
            const productFound = Object.assign({}, { id: dataProducts.find(ele => ele.id == productId).id })
            const cartProducts = cart.products
            if (cartProducts.find(ele => ele.id == productFound.id)) {
                console.log(productFound)
                productFound.quantity++
                cartProducts.find(ele => ele.id == productFound.id).quantity++
                await fs.promises.writeFile(this.path, JSON.stringify(dataCarts, null, 4), "utf-8");
                return cartProducts
            }
            productFound.quantity = 1
            cart.products.push(productFound)
            await fs.promises.writeFile(this.path, JSON.stringify(dataCarts, null, 4), "utf-8");

        }
        catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }

    async getAll() {
        if (!fs.existsSync("carts.json")) {
            fs.writeFileSync("carts.json", "[]", "utf-8");
        } else {
            const read = await fs.promises.readFile(this.path, "utf-8");
            const data = read ? JSON.parse(read) : [];
            return data
        }
    }

    async deleteCart(id) {
        try {
            let read = await this.getAll()
            let item = read.find((element) => element.id == id);
            let index = item ? read.indexOf(item) : 0
            if (index != 0) {
                read.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(read, null, 4), "utf-8")
            }
        } catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 4), "utf-8")
        } catch (e) {
            console.log(e)
            throw new Error("Something went wrong, oops", e)
        }
    }
}
