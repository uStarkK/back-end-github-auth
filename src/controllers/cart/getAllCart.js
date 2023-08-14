import CartService from "../../services/CartService.js";

export const getCart = async (req, res) => {
    res.status(200).json(await CartService.getAll)
}