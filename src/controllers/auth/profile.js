import userDTO from "../../DAO/DTO/userDTO.js";
import TicketService from "../../services/TicketService.js";

// Renderizes user profile
export const profile = async (req, res) => {
    if (!req.user) {                           //If user is NOT logged in, redirects to login page
        return res.redirect("/auth/login")
    }
    const user = req.user
    const formattedUser = new userDTO(user)
    req.logger.debug(formattedUser)
    req.session.user = formattedUser
    const tickets = await TicketService.getAll()
    const userTickets = tickets.filter(ele => ele.purchaser === user.email)
    console.log(userTickets)
    return res.render('profile', { user: formattedUser, userTickets});

}