import express from 'express';
import { getAllCarts } from '../controllers/Render_side_controllers/cart/getAllCarts.js';
import { isUser } from '../middlewares/auth.js';
export const cartRender = express.Router()




cartRender.get("/:cid", isUser, getAllCarts)