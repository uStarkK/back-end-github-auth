import { CartModel } from "../DAO/models/carts.model.js";
import { ProductsModel } from "../DAO/models/products.model.js";

class CartsService {
    async getAll(limit = null) {
        try {
            return await CartModel.find({}).limit(limit).lean()
        } catch {
            return []
        }
    }

    async getBydId(cid) {
        const cart = await CartModel.findOne({ _id: cid })
        return cart
    }

    async assignCart() {
        return await CartModel.create({})
    }

    async clearCart(cid) {
        const cartFound = await this.getBydId(cid)
        cartFound.items = [];
        await cartFound.save()
    }
    async addProductToCart(cid, pid) {
        const product = await ProductsModel.findOne({ _id: pid }).lean()
        const cart = await this.getBydId(cid)
        const productIndex = cart.items.findIndex(ele => ele.items._id.toString() === pid)

        if (productIndex === -1) {
            if (product.stock === 0) throw new Error("Not enough stock")
            cart.items.push({
                productId: product._id,
                quantity: 1
            })
            return await cart.save()
        }
    }

    async updateProductInCart(cid, pid, data) {
        const result = await CartModel.findOneAndUpdate(
            {
                _id: cid,
                items: {
                    $elemMatch: { productId: pid }
                }
            },
            {
                $inc: { 'items.$.quantity': data.quantity }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (result) {
            // Quantity of existing item modified
            return result;
        } else {
            // Item not found, add the product to the cart
            const updatedCart = await CartModel.findOneAndUpdate(
                { _id: cid },
                { $push: { items: { productId: pid, quantity: data.quantity } } },
                { new: true }
            );
            return await updatedCart.save();
        }
    }

    async updateCart(cid, data) {
        let cartFound = await this.getBydId(cid)
        await this.clearCart(cid)
        for (const item of data) {
            const productFound = await ProductsModel.findOne({ _id: item.productId });
            if (!productFound) {
                throw new Error("Product not found");
            }
            cartFound = await CartModel.findOneAndUpdate(
                { _id: cid },
                { $push: { items: { productId: productFound._id, quantity: item.quantity || 1 } } },
                { new: true }
            );

        }
        await cartFound.save()
        const quantityUpdated = cartFound.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity
        }));
        return quantityUpdated
    }


}

export default new CartsService()