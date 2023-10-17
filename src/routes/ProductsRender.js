import express from 'express';
import { getProducts } from '../controllers/Render_side_controllers/products/getProducts.js';
import { getProductById } from '../controllers/Render_side_controllers/products/getProductById.js';





export const productsRender = express.Router();





productsRender.get("/", getProducts)


productsRender.get("/products/:pid", getProductById)