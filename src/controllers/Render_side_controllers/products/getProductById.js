import { ProductsModel } from "../../../DAO/mongo/models/products.model.js";
import { sendErrorResponse } from "../../../Utils/utils.js";



export const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const user = {role: req.session?.user?.role, id: req.session?.user?.id};
        req.logger.debug(user)
        const product = await ProductsModel.findOne({ _id: productId }).lean().exec()
        req.logger.debug(product.owner)
        const {title, price, desc, stock, category, _id} = product
        return res.status(200).render("viewProduct", {title, price, desc, stock, category, id: _id, user})
    } catch (err) {
        sendErrorResponse(res, err)
    }
}