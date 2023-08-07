import { CartModel } from "../../DAO/models/carts.model.js";

export const getCartByid = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartFound = await CartModel.findOne({ _id: cartId })
        if (!cartFound) {
            return res.status(404).json({
                status: "Error",
                msg: "The cart you are looking for does not exist"
            })
        }
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
        if (err.name === 'ValidationError') {
            // Handle Mongoose validation errors
            return res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}