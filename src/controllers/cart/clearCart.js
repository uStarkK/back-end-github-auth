import { CartModel } from "../../DAO/models/carts.model.js";

export const clearCart = async (req, res) =>{
    const cartId = req.params.cid;
    const cartFound = await CartModel.find({_id: cartId})
    cartFound.items = [];
    await cartFound.save()
    return res.status(200).json({
        status: "Success",
        msg: "Cart cleared"
    })
}