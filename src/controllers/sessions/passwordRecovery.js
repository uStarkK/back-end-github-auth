import { sendErrorResponse } from "../../Utils/utils.js";
import UserService from "../../services/UserService.js";





export const passwordRecovery =  async (req, res)=> {
    try {
        const {email} = req.body;
        console.log(email)
        const recoveryCode = await UserService.recoverPassword(email);
        console.log(recoveryCode)
        if(!recoveryCode){
            res.status(500).render('checkEmail2')
        }else{
            res.status(500).render('checkEmail', {recoveryCode})
        }
        
    } catch (error) {
        sendErrorResponse(res, error)
    }
}