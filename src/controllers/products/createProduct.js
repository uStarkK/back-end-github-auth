import { ProductsModel } from "../../DAO/models/products.model.js";

export const createProduct = async (req, res) => {
    try {
        let newProduct = req.body;
        const productCreated = await ProductsModel.create(newProduct)
        return res.json({
            status: "success",
            msg: "Product created",
            data: productCreated
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
