import userDTO from "../../DAO/DTO/userDTO.js";

// Renderizes user profile
export const profile = (req, res) => {
    if (!req.user) {                           //If user is NOT logged in, redirects to login page
        return res.redirect("/auth/login")
    }
    const user = req.user
    const formattedUser = new userDTO(user)
    console.log(formattedUser)
    req.session.user = formattedUser
    return res.render('profile', { user: formattedUser });

}