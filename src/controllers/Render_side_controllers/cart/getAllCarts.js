import { CartModel } from "../../../DAO/mongo/models/carts.model.js";
import { sendErrorResponse } from "../../../Utils/utils.js";



export const getAllCarts = async (req, res) =>{
    try{
        const cartId = req.params.cid;
        let totalPrice = 0
        const cart = await CartModel.findOne({ _id: cartId}).lean().exec();
        const { items, createdAt} = cart
        function calculateTotalPrice(items){
            for (let i = 0; i < items.length; i++) {
                totalPrice += items[i].productId.price * items[i].quantity;
            }
            return totalPrice
        }
        calculateTotalPrice(items)
        req.logger.debug(totalPrice)
        totalPrice = totalPrice.toFixed(2)
        res.render("cartView", {items, createdAt, totalPrice})
    }catch (e) {
        sendErrorResponse(res, err)
    }
}