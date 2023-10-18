import { sendErrorResponse } from "../../../Utils/utils.js"




export const verifyRecoveryRender =  async (req, res) => {
    try {
        res.status(200).render('check-recover',{})
        
    } catch (error) {
        res.render("error")
        sendErrorResponse(res, err)
        
    }
}