import express from 'express';
import { getProductById } from '../controllers/Render_side_controllers/products/getProductById.js';
import { getProducts } from '../controllers/Render_side_controllers/products/getProducts.js';





export const productsRender = express.Router();





productsRender.get("/", getProducts)


productsRender.get("/products/:pid", getProductById)