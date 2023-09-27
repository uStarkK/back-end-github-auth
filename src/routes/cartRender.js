import express from 'express';
import { CartModel } from '../DAO/mongo/models/carts.model.js';
import { isUser } from '../middlewares/auth.js';
export const cartRender = express.Router()




cartRender.get("/:cid", isUser, async (req, res) =>{
    try{
        const cartId = req.params.cid;
        const cart = await CartModel.findOne({ _id: cartId}).lean().exec();
        const { items, createdAt} = cart
        
        res.render("cartView", {items, createdAt})
    }catch (err) {
        req.logger.error(err)
    }
})