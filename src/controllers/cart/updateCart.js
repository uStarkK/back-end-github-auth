
import CartService from "../../services/CartService.js";

export const updateCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const {data} = req.body
        const cartFound = CartService.getBydId(cartId)
        if (!cartFound) {
            return res.status(404).json({
                status: "Error",
                msg: "The cart you are looking for does not exist"
            })
        }
        const update = await CartService.updateCart(cartId, data)
        
        return  res.status(200).json({
            status: "Success",
            msg: "Cart updated succesfully",
            data: update
        })
    } catch (err) {
        if (err.message === 'Product not found') {
            return res.status(404).json({
                status: "Error",
                msg: "Product does not exist"
            });
        } else if (err.name === 'ValidationError') {
            // Handles Mongoose validation errors
            return res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

}