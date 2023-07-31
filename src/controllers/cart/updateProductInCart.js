import { CartModel } from "../../DAO/models/carts.model.js";
import { ProductsModel } from "../../DAO/models/products.model.js";

export const updateProductInCart = async (req, res) =>{
    try{
        const cartId = req.params.cid;
        const data = req.body
        const productId = req.params.pid
        const cartFound = await CartModel.findOne({_id: cartId})
        const productFound = await ProductsModel.findOne({_id: productId})
        if (!cartFound) {
            return res.status(404).json({
                status: "Error",
                msg: "The cart you are looking for does not exist"
            })
        }
        if (!productFound) {
            return res.status(404).json({
                status: "Error",
                msg: "Product does not exist"
            })
        }
        const result = await CartModel.findOneAndUpdate(
            {
                _id: cartId,
                items: {
                    $elemMatch: { productId: productId }
                }
            },
            {
                $set: { 'items.$.quantity': data.quantity  }
            },
            {
                new: true,
                runValidators: true
            }
        );
        if (result) {
            // Item already exists in the cart, quantity modified 
            const updatedCart = await CartModel.findOneAndUpdate(
                {
                    _id: cartId,
                    items: {
                        $elemMatch: { productId: productId }
                    }
                },
                {
                    $inc: { 'items.$.quantity': 1  }
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            res.status(200).json({
                status: "success",
                msg: "Quantity modified",
                data: updatedCart
            })
        } else {
            // Item not found, add the product to the cart
            const cart = await CartModel.findOneAndUpdate(
                { _id: cartId },
                { $push: { items: { productId: productId, quantity: data.quantity } } },
                { new: true }
            );
            res.status(200).json({
                status: "success",
                msg: "Product added to cart",
                data: cart
            })
        }
    }catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
}
}