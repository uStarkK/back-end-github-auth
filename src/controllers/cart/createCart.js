import { CartModel } from "../../DAO/models/carts.model.js";

export const createCart = async (req, res) => {
    try {
        const newCart = new CartModel({});

        const savedCart = await newCart.save();

        res.status(201).json(savedCart);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}