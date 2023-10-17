import moment from "moment"
import { parseLastConnection } from "../../../Utils/utils.js"
import UserService from "../../../services/UserService.js"



export const getUsers = async (req, res) => {
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
}