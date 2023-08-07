import { CartModel } from "../../DAO/models/carts.model.js";
import { ProductsModel } from "../../DAO/models/products.model.js";
import CartService from "../../services/CartService.js";

export const updateProductInCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const data = req.body;
        const productId = req.params.pid;

        const cartFound = await CartService.getBydId(cartId);
        const productFound = await ProductsModel.findOne({ _id: productId });
        if (!cartFound) {
            return res.status(404).json({
                status: "Error",
                msg: "The cart you are looking for does not exist"
            });
        }
        if (!productFound) {
            return res.status(404).json({
                status: "Error",
                msg: "Product does not exist"
            });
        }

        const updatedCart = await CartService.updateProductInCart(cartId, productId, data);
        res.status(200).json({
            status: "success",
            payload: updatedCart
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handles Mongoose validation errors
            return res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};