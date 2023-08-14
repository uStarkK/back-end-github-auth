import { ProductsModel } from "../../DAO/models/products.model.js";
import CartService from "../../services/CartService.js";
import { sendErrorResponse } from "../../utils.js";

export const updateProductInCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const data = req.body;
        const productId = req.params.pid;
        const productFound = await ProductsModel.findOne({ _id: productId });

        const updatedCart = await CartService.updateProductInCart(cartId, productId, data);
        res.status(200).json({
            status: "success",
            payload: updatedCart
        });
    } catch (err) {
        sendErrorResponse(res, err)
    }
};