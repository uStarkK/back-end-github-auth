import express from 'express';
import { addToCart, createCart, deleteFromCart, getCart, getCartByid, updateCart, updateProductInCart } from '../controllers/cartController.js';



export const cartRouter = express.Router();


cartRouter.get('/', getCart);

cartRouter.get("/:cid", getCartByid)

cartRouter.post("/", createCart)

cartRouter.post("/:cid/products/:pid", addToCart)

cartRouter.delete("/:cid/products/:pid", deleteFromCart)

cartRouter.put("/:cid/products/:pid", updateProductInCart)

cartRouter.put("/:cid", updateCart)

cartRouter.get("*", (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})