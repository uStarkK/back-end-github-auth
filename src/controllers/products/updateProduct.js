import ProductService from "../../services/ProductService.js";
import { sendErrorResponse } from "../../Utils/utils.js";

export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid
        const { code, ...updatedProduct } = req.body
        console.log(req.body)
        const update = await ProductService.updateProduct(pid, updatedProduct);
        return res.json({
            status: "success",
            msg: "product updated",
            data: update
        })
    } catch (err) {
        sendErrorResponse(res, err)
    }
}