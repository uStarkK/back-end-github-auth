import express from 'express';
import { isUser } from '../middlewares/auth.js';
import { getAllCarts } from '../controllers/Render_side_controllers/cart/getAllCarts.js';
export const cartRender = express.Router()




cartRender.get("/:cid", isUser, getAllCarts)