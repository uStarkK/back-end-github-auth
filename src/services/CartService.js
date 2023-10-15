
import CartsDAO from "../DAO/mongo/CartsDAO.js";
import { ProductsModel } from "../DAO/mongo/models/products.model.js";
import { generateTicketCode } from "../Utils/utils.js";
import CustomError from "./errorHandling/CustomError.js";
import HandledErrors from "./errorHandling/ErrorCode.js";
import {getErrorCause} from "./errorHandling/info.js";
import ProductService from "./ProductService.js"
import TicketService from "./TicketService.js";



class CartsService {
    async getAll() {
        try {
            return await CartsDAO.fetchAllCarts()
        } catch {
            return []
        }
    }
    async getById(cid) {
        const cart = await CartsDAO.fetchCartById(cid)
        if (!cart) {
            CustomError.createError({
                name: "Cart not found",
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to find the requested cart",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }
        return cart
    }

    async assignCart() {
        return await CartsDAO.assignCart()
    }

    async saveCart(cid) {
        return await CartsDAO.saveCart(cid)
    }

    async deleteCart(cid){
        return await CartsDAO.deleteCart(cid)
    }

    async clearCart(cid) {
        const cartFound = await this.getById(cid)
        cartFound.items = [];
        await this.saveCart(cid)
    }

    async clearCartAfterPurchase(cid, purchaser) {
        const cart = await this.getById(cid);
        const itemsToPurchase = [];
        const itemsToKeep = [];
        let totalAmount = 0;
        for (const item of cart.items) {
            const product = await ProductService.getById(item.productId);
            if (product.stock >= item.quantity) {
                itemsToPurchase.push({
                    productId: product._id,
                    name: product.title,
                    quantity: item.quantity,
                    price: product.price,
                    subtotal: product.price * item.quantity
                });
                totalAmount += product.price * item.quantity;

                product.stock -= item.quantity;
                await ProductService.updateProduct(product._id, product)
            } else {
                itemsToKeep.push(item);
            }

        }
        if(!itemsToPurchase[0]){
            CustomError.createError({
                name: "No items available for purchase",
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to process the last request",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }
        
        const ticket = await TicketService.createOne({
            code: await generateTicketCode(),
            amount: totalAmount,
            purchaser
        })
        if (itemsToKeep[0]) {
            // Update the cart by removing purchased items
            const updatedCart = await CartsDAO.fetchAndUpdate(
                { _id: cid },
                { $set: { items: itemsToKeep } }
            )
            return {
                updatedCart,
                itemsToPurchase,
                ticket
            };
        } else {
            await CartsDAO.fetchAndUpdate(
                { _id: cid },
                { $set: { items: [] } }
            )
            return {
                itemsToPurchase,
                ticket
            }
        }
    }


    async addProductToCart(cid, pid) {
        const product = await ProductsModel.findOne({ _id: pid }).lean()
        const cart = await this.getById(cid)
        const productIndex = cart.items.findIndex(ele => ele.items._id.toString() === pid)

        if (productIndex === -1) {
            if (product.stock === 0){
                CustomError.createError({
                    name: "Not enough stock",
                    cause: getErrorCause(this.name),
                    msg: "An error occurred while trying to process the last request",
                    code: HandledErrors.STOCK_RELATED_ERROR
                })
            }
            cart.items.push({
                productId: product._id,
                quantity: 1
            })
        }
    }

    async updateProductInCart(cid, pid, data) {
        const cart = await this.getById(cid)
        if (!cart) {
            CustomError.createError({
                name: "Cart not found",
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to find the requested cart",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }
        const product = await ProductsModel.find({ _id: pid })
        if (!product) {
            CustomError.createError({
                name: "Product not found",
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to find the requested product",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }
        const result = await CartsDAO.fetchAndUpdate(
            {
                _id: cid,
                items: {
                    $elemMatch: { productId: pid }
                }
            },
            {
                $inc: { 'items.$.quantity': data.quantity || 1 }
            }
        );

        if (result) {
            // Quantity of existing item modified
            return result;
        } else {
            // Item not found, add product to cart
            const updatedCart = await CartsDAO.fetchAndUpdate(
                { _id: cid },
                { $push: { items: { productId: pid, quantity: data.quantity || 1 } } }
            );
            return updatedCart
        }
    }

    async updateCart(cid, data) {
        let cartFound = await this.getById(cid)
        await this.clearCart(cid)
        for (const item of data) {
            const productFound = await ProductsModel.findOne({ _id: item.productId });
            if (!productFound) {
                CustomError.createError({
                    name: "Product not found",
                    cause: getErrorCause(this.name),
                    msg: "An error occurred while trying to find the requested product",
                    code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
                })
            }
            if (productFound.stock === 0) {
                CustomError.createError({
                    name: "Not enough stock",
                    cause: getErrorCause(this.name),
                    msg: "An error occurred while trying to process the last request",
                    code: HandledErrors.STOCK_RELATED_ERROR
                })
            }
            cartFound = await CartsDAO.fetchAndUpdate(
                { _id: cid },
                { $push: { items: { productId: productFound._id, quantity: item.quantity || 1 } } }
            );

        }
        await this.saveCart(cartFound._id)
        const quantityUpdated = cartFound.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity
        }));
        return quantityUpdated
    }

    async deleteFromCart(cid, pid) {

        const cart = await this.getById(cid)
        if (!cart) {
            CustomError.createError({
                name: "Cart not found",
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to find the requested cart",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }

        const product = await ProductsModel.findById({ _id: pid })
        if (!product) {
            CustomError.createError({
                name: "Product not found",
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to find the requested product",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }

        const result = await CartsDAO.fetchAndUpdate(
            { _id: cid },
            { $pull: { items: { productId: pid } } }
        );
    }

}

export default new CartsService()