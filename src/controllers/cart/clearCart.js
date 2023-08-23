import CartService from "../../services/CartService.js";
import { sendErrorResponse } from "../../utils.js";

export const clearCart = async (req, res) =>{
    try{const cartId = req.params.cid;
    const purchaser = req.session.user.email
    const result = await CartService.clearCartAfterPurchase(cartId, purchaser)
    const {updatedCart} = result
    updatedCart? res.status(207).json({
        status: "207 Multi-Status",
        msg: "Purchase completed. Unavailable products were sent back to Cart",
        payload: updatedCart
    }) : res.status(200).json({
        status: "Success",
        msg: "Succesful purchase"
    })
}
    catch(err){
        sendErrorResponse(res, err)
    }
}