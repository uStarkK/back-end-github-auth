import { ProductsModel } from "../../DAO/models/products.model.js";

export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid
        const { code, ...updatedProduct } = req.body
        await ProductsModel.updateOne({ _id: pid }, updatedProduct);
        return res.json({
            status: "success",
            msg: "product updated",
            data: updatedProduct
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}