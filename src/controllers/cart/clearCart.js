import { CartModel } from "../../DAO/models/carts.model.js";
import CartService from "../../services/CartService.js";

export const clearCart = async (req, res) =>{
    const cartId = req.params.cid;
    await CartService.clearCart(cartId)
    return res.status(200).json({
        status: "Success",
        msg: "Cart cleared"
    })
}