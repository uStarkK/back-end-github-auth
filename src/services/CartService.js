import { CartModel } from "../DAO/models/carts.model.js";
import { ProductsModel } from "../DAO/models/products.model.js";

class CartsService {
    async getAll(limit = null) {
        try {
            return await CartModel.find({}).limit(limit).lean()
        } catch {
            return []
        }
    }

    async getBydId(cid){
        const cart = await CartModel.findOne({_id: cid})
        return cart
    }

    async createCart(){
        return await CartModel.create({})
    }

    async addProductToCart(cid, pid){
        const product = await ProductsModel.findOne({_id: pid}).lean()
        const cart = this.getBydId(cid)
        const productIndex = cart.items.findIndex(ele => ele.items._id.toString() === pid)

        if (productIndex === -1){
            if(product.stock === 0) throw new Error("Not enough stock")
            cart.items.push({
                productId: product._id,
                quantity: 1
            })
            return await cart.save()
        }
    }

    

    
}

export default new CartsService()