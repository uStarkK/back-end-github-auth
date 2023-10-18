import { sendErrorResponse } from "../../../Utils/utils.js";




export const passwordRecoveryRender = async (req, res) =>{
    try {
        res.render('recover-pass', {});
    } catch (error) {
        sendErrorResponse(res, error)
    }
}