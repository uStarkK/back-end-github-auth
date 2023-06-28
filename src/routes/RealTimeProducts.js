import express from 'express';
import { ProductsModel } from '../DAO/models/products.model.js';

export const realTimeProducts = express.Router();





realTimeProducts.get('/', async (req, res) => {
    try{const products = await ProductsModel.find({}).lean().exec()
    return res.status(200).render("realTimeProducts", {products})
    }catch(err){
        console.log("error")
    }
})