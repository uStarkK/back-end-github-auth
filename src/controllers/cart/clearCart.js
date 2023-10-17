import CartService from "../../services/CartService.js"





export const clearCart = async (req, res) =>{
    const cid = req.params.cid
    await CartService.clearCart(cid)
    return res.header('X-Message', 'Cart cleared').status(204).json()
}