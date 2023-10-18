import { sendErrorResponse } from "../../Utils/utils.js";
import CartService from "../../services/CartService.js";

export const addToCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const uid = req.session?.user.id

        CartService.addProductToCart(cartId, productId, uid)
        return res.status(200).json({
            status: "Success",
            msg: "Product added to cart"
        })
    } catch (err) {
        sendErrorResponse(res, err)
    }
}

