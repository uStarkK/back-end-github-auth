import { sendErrorResponse } from "../../Utils/utils.js";
import UserService from "../../services/UserService.js";




export const verifyRecovery =  async (req, res) => {
    try {
        const verify = req.body;
        await UserService.verifyRecover(verify)
        return res.status(500).render('login');
    } catch (error) {
        sendErrorResponse(res, error)
    }

}