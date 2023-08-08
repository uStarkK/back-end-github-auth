import { CartModel } from "../../DAO/models/carts.model.js";
import { ProductsModel } from "../../DAO/models/products.model.js";
import CartService from "../../services/CartService.js";
import { sendErrorResponse } from "../../utils.js";

export const addToCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        CartService.addProductToCart(cartId, productId)
        return res.status(200).json({
            status: "Success",
            msg: "Product added to cart"
        })
    } catch (err) {
        sendErrorResponse(res, err)
    }
}

