import ProductService from "../../services/ProductService.js";
import { sendErrorResponse } from "../../utils.js";

export const createProduct = async (req, res) => {
    try {
        let newProduct = req.body;
        const productCreated = await ProductService.createOne(newProduct)
        return res.json({
            status: "success",
            msg: "Product created",
            data: productCreated
        })
    } catch (err) {
        sendErrorResponse(res, err)
    }
}
