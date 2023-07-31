import { CartModel } from "../../DAO/models/carts.model.js";
import { ProductsModel } from "../../DAO/models/products.model.js";

export const updateCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const data = req.body
        /* console.log(data) */
        const cartFound = await CartModel.findOne({ _id: cartId })
        if (!cartFound) {
            return res.status(404).json({
                status: "Error",
                msg: "The cart you are looking for does not exist"
            })
        }
        cartFound.items = [];
        data.forEach(async item => {
            const productFound = await ProductsModel.findOne({ _id: item.productId })
            if (!productFound) {
                return res.status(404).json({
                    status: "Error",
                    msg: "Product does not exist"
                })
            }
            const cart = await CartModel.findOneAndUpdate(
                { _id: cartId },
                { $push: { items: { productId: productFound._id, quantity: item.quantity || 1 } } },
                { new: true }
            )
        })
        await cartFound.save()
        return  res.status(200).json({
            status: "Success",
            msg: "Cart updated succesfully",
            data: cartFound.items
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

}