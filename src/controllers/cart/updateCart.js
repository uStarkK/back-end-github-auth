
import CartService from "../../services/CartService.js";
import { sendErrorResponse } from "../../Utils/utils.js";

export const updateCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const {data} = req.body
        const update = await CartService.updateCart(cartId, data)
        
        return  res.status(200).json({
            status: "Success",
            msg: "Cart updated succesfully",
            data: update
        })
    } catch(err){
        sendErrorResponse(res, err)
    }

}