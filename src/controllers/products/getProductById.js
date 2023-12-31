import ProductService from "../../services/ProductService.js";
import { sendErrorResponse } from "../../Utils/utils.js";
export const getProductByid = async (req, res) => {
    try {
        const pid = (req.params.pid);
        const filteredData = await ProductService.getById(pid)
        res.status(200).json(filteredData)
    } catch (err) {
        sendErrorResponse(res, err)
    }
}