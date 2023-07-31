
// Renderizes user profile
export const profile = (req, res) => {
    if (!req.user) {                           //If user is NOT logged in, redirects to login page
        return res.redirect("/auth/login")
    }
    const user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role, cartId: req.user.cartId };
    req.session.user = user
    return res.render('profile', { user: user });

}