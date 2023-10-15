import { ProductsModel } from "../../DAO/mongo/models/products.model.js";
import ProductService from "../../services/ProductService.js";
import { sendErrorResponse } from "../../Utils/utils.js";

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const uid = req.session?.user?._id
        console.log(uid, "sadasd")
        /* await ProductService.deleteProduct(pid) */
        return res.header('X-Message', 'Product successfully deleted').status(204).json()
    } catch (err) {
        sendErrorResponse(res, err)
    }
}