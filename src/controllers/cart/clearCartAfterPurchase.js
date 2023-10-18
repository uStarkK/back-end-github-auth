import { sendErrorResponse } from "../../Utils/utils.js";
import CartService from "../../services/CartService.js";

export const clearCartAfterPurchase = async (req, res) =>{
    try{const cartId = req.params.cid;
    const uid = req.session?.user?.id
    const result = await CartService.clearCartAfterPurchase(cartId, uid)
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