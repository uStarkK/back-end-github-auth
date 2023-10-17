import { ProductsModel } from "../../DAO/mongo/models/products.model.js";
import CartService from "../../services/CartService.js";
import { sendErrorResponse } from "../../Utils/utils.js";

export const updateProductInCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const {quantity} = req.body
        const productId = req.params.pid;
        const uid = req.session?.user?.id
        const updatedCart = await CartService.updateProductInCart(cartId, productId, quantity, uid);
        req.logger.debug(updatedCart)
        res.status(200).json({
            status: "success",
            payload: updatedCart
        });
    } catch (err) {
        sendErrorResponse(res, err)
    }
};