import express from 'express';
import { ProductsModel } from '../DAO/mongo/models/products.model.js';
import { isAdmin } from '../middlewares/auth.js';

export const realTimeProducts = express.Router();




realTimeProducts.get('/', isAdmin, async (req, res) => {
    try{const products = await ProductsModel.find({}).lean().exec()
    return res.status(200).render("realTimeProducts", {products})
    }catch(err){
        console.log("error")
    }
})