

export const registerRedirect = (req, res) => {
    if (req.user) {                           //If user is ALREADY logged in, redirects to profile
        return res.redirect("/auth/profile")
    }
    return res.render('register', {});
}




// Registration process
export const register = (req, res) => {
    if (!req.user) {
        return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role, cartId: req.user.cartId };
    return res.redirect("/auth/login");
}


//If registration fails, sends error message
export const failRegister = async (req, res) => {
    return res.json({ error: 'fail to register' });
}