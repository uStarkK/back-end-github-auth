import express from 'express';
import { createProduct } from '../controllers/products/createProduct.js';
import { deleteProduct } from '../controllers/products/deleteProduct.js';
import { getProduct } from '../controllers/products/getProduct.js';
import { getProductByid } from '../controllers/products/getProductById.js';
import { updateProduct } from '../controllers/products/updateProduct.js';
import { isAdmin, isUser } from '../middlewares/auth.js';

export const productsRouter = express.Router();


productsRouter.get('/', getProduct);

productsRouter.get("/:pid", getProductByid)

productsRouter.post("/", isUser, isAdmin, createProduct)

productsRouter.put("/:pid", isUser, isAdmin, updateProduct)

productsRouter.delete("/:pid", isUser, isAdmin, deleteProduct)

productsRouter.get("*", (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})






