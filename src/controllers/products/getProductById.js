import { ProductsModel } from "../../DAO/models/products.model.js";
export const getProductByid = async (req, res) => {
    try {
        const pid = (req.params.pid);
        const filteredData = await ProductsModel.findOne({ _id: pid })
        res.status(200).json(filteredData)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}