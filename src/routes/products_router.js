import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductByid, updateProduct } from '../controllers/productController.js';

export const productsRouter = express.Router();


productsRouter.get('/', getProduct);

productsRouter.get("/:pid", getProductByid)

productsRouter.post("/", createProduct)

productsRouter.put("/:pid", updateProduct)

productsRouter.delete("/:pid", deleteProduct)

productsRouter.get("*", (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})






