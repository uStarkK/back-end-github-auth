import express from 'express';
import { CartModel } from '../DAO/models/carts.model.js';

export const cartRender = express.Router()




cartRender.get("/:cid", async (req, res) =>{
    try{
        const cartId = req.params.cid;
        const cart = await CartModel.findOne({ _id: cartId}).lean().exec();
        const { items, createdAt} = cart
        res.render("cartView", {items, createdAt})
    }catch (err) {
        console.log(err)
    }
})