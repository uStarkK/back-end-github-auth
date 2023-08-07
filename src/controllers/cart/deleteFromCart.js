import { CartModel } from "../../DAO/models/carts.model.js";
import { ProductsModel } from "../../DAO/models/products.model.js";

export const deleteFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cartFound = await CartModel.findOne({ _id: cartId })
        if (!cartFound) {
            return res.status(404).json({
                status: "Error",
                msg: "The cart you are looking for does not exist"
            })
        }
        const productFound = await ProductsModel.findOne({ _id: productId })
        if (!productFound) {
            return res.status(404).json({
                status: "Error",
                msg: "Product does not exist"
            })
        }
        const result = await CartModel.findOneAndUpdate(
            { _id: cartId },
            { $pull: { items: { _id: productId } } },
            { new: true }
        );
        console.log(result)
        return res.header('X-Message', 'Product successfully deleted').status(204).json()
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle Mongoose validation errors
            return res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
