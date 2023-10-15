import ProductService from "../../services/ProductService.js";
import { sendErrorResponse } from "../../Utils/utils.js";

export const createProduct = async (req, res) => {
    try {
        const { ...newProduct } = req.body;
        const uid = req.session?.user?.id
        const productCreated = await ProductService.createOne(newProduct, uid)
        return res.json({
            status: "success",
            msg: "Product created",
            data: productCreated
        })
    } catch (err) {
        sendErrorResponse(res, err)
    }
}
