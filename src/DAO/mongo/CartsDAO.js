import { CartModel } from "./models/carts.model.js";



class CartsDAO {
    async fetchAllCarts(){
        return await CartModel.find({}).lean()
    }
    async fetchCartById( cartId ){
        return await CartModel.findOne({_id: cartId})
    }
    async fetchAndUpdate(filter, update) {
        return await CartModel.findOneAndUpdate(filter, update, { new: true, runValidators: true });
    }
    
    async assignCart(){
        return await CartModel.create({})
    }
    async saveCart(cid){
        return await this.fetchCartById(cid).save()
    }
}



export default new CartsDAO()