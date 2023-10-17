import { ProductsModel } from "../../../DAO/mongo/models/products.model.js";



export const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const user = {role: req.session?.user?.role, id: req.session?.user?.id};
        console.log(user)
        const product = await ProductsModel.findOne({ _id: productId }).lean().exec()
        console.log(product.owner)
        const {title, price, desc, stock, category, _id} = product
        return res.status(200).render("viewProduct", {title, price, desc, stock, category, id: _id, user})
    } catch (err) {
        req.logger.error(err)
    }
}