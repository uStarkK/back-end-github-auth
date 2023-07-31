import { ProductsModel } from "../../DAO/models/products.model.js";

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        await ProductsModel.deleteOne({ _id: pid })
        return res.header('X-Message', 'Product successfully deleted').status(204).json()
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}