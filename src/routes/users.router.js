import express from 'express';
import { isAdmin, isUser } from '../middlewares/auth.js';
import UserService from '../services/UserService.js';
import userDTO from '../DAO/DTO/userDTO.js';
import moment from 'moment/moment.js';
import { sendMail } from '../Utils/emailRecovery.js';
import { logger } from '../Utils/logger.js';
import dotenv from "dotenv"
export const usersRouter = express.Router();

dotenv.config()

const {GOOGLE_EMAIL} = process.env
usersRouter.get('/', isUser, isAdmin, async (req, res) => {
    try {
        const users = await UserService.getAll();
        req.logger.debug(users);
        let formattedUsers = [];
        for (let i = 0; i < users.length; i++) {
            formattedUsers[i] = new userDTO(users[i])
            req.logger.debug(formattedUsers[i])
        }

        return res.status(200).json({
            status: 'success',
            msg: 'users list',
            data: formattedUsers,
        });
    } catch (e) {
        req.logger.error(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
        });
    }
});


usersRouter.delete("/", async (req, res) => {
    try {
        const users = await UserService.getAll()
        const currentTime = moment()
        const cutoffTime = moment(currentTime).subtract(2, "minutes")
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
})



usersRouter.delete('/:id', async (req, res) => {
    try {
        return res.status(200).json({
            status: 'success',
            msg: 'user deleted',
            data: {},
        });
    } catch (e) {
        req.logger.error(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
});

usersRouter.put('/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const { firstName, lastName, email, role } = req.body;
        const userToUpdate = {
            uid: uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
        }
        UserService.updateOne({...userToUpdate})
        return res.status(201).json({
            status: 'success',
            msg: 'user updated',
            data: { _id: uid, firstName, lastName, email, role},
        });
    } catch (e) {
        req.logger.error(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
});             


