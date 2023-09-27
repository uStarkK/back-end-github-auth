import CartService from "../../services/CartService.js";
import { sendErrorResponse } from "../../Utils/utils.js";


export const deleteFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await CartService.deleteFromCart(cartId, productId)
        return res.header('X-Message', 'Product successfully deleted').status(204).json()
    } catch (err) {
        sendErrorResponse(res, err)
    }
}
