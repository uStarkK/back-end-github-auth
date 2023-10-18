import { ProductsModel } from "../../DAO/mongo/models/products.model.js";
import CustomError from "../../services/errorHandling/CustomError.js";
import ProductService from "../../services/ProductService.js";
import { sendErrorResponse } from "../../Utils/utils.js";

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const uid = req.session?.user?.id
        await ProductService.deleteProduct(pid, uid)
        return res.header('X-Message', 'Product successfully deleted').status(204).json()
    } catch (err) {
        sendErrorResponse(res, err)
    }
}