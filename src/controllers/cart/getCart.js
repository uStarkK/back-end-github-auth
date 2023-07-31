import { CartModel } from "../../DAO/models/carts.model.js";

export const getCart = async (req, res) => {
    res.status(200).json(await CartModel.find({}))
}