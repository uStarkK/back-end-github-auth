import { ProductsModel } from "../../../DAO/mongo/models/products.model.js";
import { sendErrorResponse } from "../../../Utils/utils.js";



export const getProducts = async (req, res, next) => {
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
        const user = req.session?.user
        const { docs, ...rest } = queryResult
        return res.status(200).render("home", {docs, sort, query, pagination: rest, user })
    } catch (err) {
        sendErrorResponse(res, err)
    }
}