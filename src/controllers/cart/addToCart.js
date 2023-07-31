import { CartModel } from "../../DAO/models/carts.model.js";
import { ProductsModel } from "../../DAO/models/products.model.js";

export const addToCart = async (req, res) => {
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
        {
            _id: cartId,
            items: {
                $elemMatch: { productId: productId }
            }
        },
        {
            $inc: { 'items.$.quantity': 1 }
        },
        {
            new: true
        }
    );
    console.log(result)

    if (result) {
        // Item already exists in the cart, quantity increased by 1
        res.status(200).json({
            status: "success",
            msg: "Quantity increased by 1",
            data: result
        })
    } else {
        // Item not found, add the product to the cart
        const cart = await CartModel.findOneAndUpdate(
            { _id: cartId },
            { $push: { items: { productId: productId, quantity: 1 } } },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            msg: "Product added to cart",
            data: cart
        })
    }
}