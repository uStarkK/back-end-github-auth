import { CartModel } from "../../DAO/models/carts.model.js";

export const createCart = async (req, res) => {
    try {
        const newCart = new CartModel({});

        const savedCart = await newCart.save();

        res.status(201).json(savedCart);
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle Mongoose validation errors
            return res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}