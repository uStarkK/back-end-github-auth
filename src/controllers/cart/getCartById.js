import CartService from "../../services/CartService.js";
import { sendErrorResponse } from "../../Utils/utils.js";

export const getCartByid = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartFound = await CartService.getById(cartId)
        cartFound.items.length < 1 ? res.status(200).json({
            status: "Success",
            msg: "Your cart is empty, let's start shopping!",
            cart: cartFound.items
        }) : res.status(200).json({
            cart: cartFound._id,
            Items: cartFound.items,
            createdAt: cartFound.createdAt
        })
    } catch (err) {
        sendErrorResponse(res, err)
    }
}