import express from 'express';
import { addToCart } from '../controllers/cart/addToCart.js';
import { clearCartAfterPurchase } from '../controllers/cart/clearCartAfterPurchase.js';
import { createCart } from '../controllers/cart/createCart.js';
import { deleteFromCart } from '../controllers/cart/deleteFromCart.js';
import { getCart } from '../controllers/cart/getAllCart.js';
import { getCartByid } from '../controllers/cart/getCartById.js';
import { updateCart } from '../controllers/cart/updateCart.js';
import { updateProductInCart } from '../controllers/cart/updateProductInCart.js';
import { isUser } from '../middlewares/auth.js';
import { clearCart } from '../controllers/cart/clearCart.js';
export const cartRouter = express.Router();

cartRouter.get('/', getCart);

cartRouter.get("/:cid", isUser, getCartByid)

cartRouter.delete("/:cid", isUser, clearCart)

cartRouter.post("/", isUser, createCart)

cartRouter.post("/:cid/products/:pid", isUser, addToCart)

cartRouter.delete("/:cid/products/:pid", isUser, deleteFromCart)

cartRouter.put("/:cid/products/:pid", isUser, updateProductInCart)

cartRouter.put("/:cid", isUser, updateCart)

cartRouter.put("/:cid/purchase", isUser, clearCartAfterPurchase)

cartRouter.get("*", (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})