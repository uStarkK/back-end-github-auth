import express from "express";
import UserService from "../services/UserService.js";
import { isAdmin } from "../middlewares/auth.js";
import userDTO from "../DAO/DTO/userDTO.js";
import moment from "moment";
import { parseLastConnection } from "../Utils/utils.js";


export const userRender = express.Router();


userRender.get("/", isAdmin, async (req, res) => {
    const users = await UserService.getAll()
    const currentTime = moment()
    const cutoffTime = moment(currentTime).subtract(2, "days")
    const activeUsers = [];
    const inactiveUsers = [];

    for (let i = 0; i < users.length; i++) {
        const lastConnectionTime = moment(users[i].lastConnection);
        const parsedLastConnection = parseLastConnection(users[i].lastConnection);

        if (lastConnectionTime.isAfter(cutoffTime)) {
            activeUsers.push({
                ...users[i],
                lastConnection: parsedLastConnection
            });
        } else {
            inactiveUsers.push({
                ...users[i],
                lastConnection: parsedLastConnection
            });
        }
    }
    res.render("users", { users: activeUsers, inactiveUsers: inactiveUsers })
})



userRender.get("/:uid", isAdmin, async (req, res) => {
    const uid = req.params.uid
    const user = await UserService.getOne(uid)
    /* req.logger.debug(user) */
    res.render("userView", { firstName: user.firstName, lastName: user.lastName || "", email: user.email, role: user.role, userId: user._id })
})

