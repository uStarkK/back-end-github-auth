import express from 'express';
import { ProductsModel } from '../DAO/models/products.model.js';





export const productsRender = express.Router();





productsRender.get("/", async (req, res, next) => {
    try {
        const { limit, page, sort, query } = req.query;
        const queryMongo = {}
        if (query) {
            queryMongo.$text = { $search: query }
        }
        const queryOptions = {
            limit: limit || 5,
            page: page || 1,
            lean: true,
        };

        if (sort) {
            queryOptions.sort = { price: sort }
        } else {
            queryOptions.sort = {};
        }
        const queryResult = await ProductsModel.paginate(queryMongo, { ...queryOptions });

        const { docs, ...rest } = queryResult
        return res.status(200).render("home", { docs, pagination: rest })
    } catch (err) {
        console.log("error")
    }
})


productsRender.get("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;

        const product = await ProductsModel.findOne({ _id: productId }).lean().exec()
        const {title, price, desc, stock, category, _id} = product
        return res.status(200).render("viewProduct", {title, price, desc, stock, category, id: _id})
    } catch (err) {
        console.log(err)
    }
})