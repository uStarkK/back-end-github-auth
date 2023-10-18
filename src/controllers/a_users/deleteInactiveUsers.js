import dotenv from "dotenv"
import moment from "moment"
import { sendMail } from "../../Utils/emailRecovery.js"
import UserService from "../../services/UserService.js"

dotenv.config()

const {GOOGLE_EMAIL} = process.env


export const deleteInactiveUsers = async (req, res) => {
    try {
        const users = await UserService.getAll()
        const currentTime = moment()
        const cutoffTime = moment(currentTime).subtract(2, "days")
        const inactiveUsers = users.filter(user => {
            const lastConnectionTime = moment(user.lastConnection);
            return lastConnectionTime.isBefore(cutoffTime)
        })
        await Promise.all(
            inactiveUsers.map(async user => {
                // Deletes user from the database
                await UserService.deleteOne(user._id);
                // Sends an email notification to the user
                console.log(user.email)
                const emailOptions = {
                    from: GOOGLE_EMAIL,
                    to: user.email,
                    subject: 'Account Deletion Notification',
                    text: 'Your account has been deleted due to inactivity for the last 2 days.',
                };

                await sendMail(emailOptions)
            })
        );
        res.status(200).json({message: "Inactive Users succesfully deleted and notified"})
    } catch (error) {
        logger.error("Error deleting Inactive Users", error)
        res.status(500).json({message: "Internal Server error"})
    }
}