import { sendErrorResponse } from "../../Utils/utils.js";
import CartService from "../../services/CartService.js";

export const createCart = async (req, res) => {
    try {
        const savedCart = await CartService.assignCart()
        res.status(201).json(savedCart);
    } catch (err) {
        sendErrorResponse(res, err)
    }
}