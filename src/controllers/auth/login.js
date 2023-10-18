import { sendErrorResponse } from "../../Utils/utils.js";

export const loginRedirect = (req, res) => {
    if (req.user) {                                  //If user is ALREADY logged in, redirects to profile
        return res.redirect("/auth/profile")
    }
    return res.render('login', {});
}


//Login process 
export const login = async (req, res) => {
    if (!req.user) {
        return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role, cartId: req.user.cartId };
    return res.redirect("/auth/profile");
}

//If login fails, sends error message
export const failLogin = async (req, res) => {
    req.logger.error("Failed to login, invalid credentials")
    return res.redirect("/auth/login")
}