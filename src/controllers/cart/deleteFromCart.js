import { CartModel } from "../../DAO/models/carts.model.js";
import { ProductsModel } from "../../DAO/models/products.model.js";
import CartService from "../../services/CartService.js";
import { sendErrorResponse } from "../../utils.js";


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
