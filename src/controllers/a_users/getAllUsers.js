import userDTO from "../../DAO/DTO/userDTO.js";
import UserService from "../../services/UserService.js";



export const getAllUsers = async (req, res) => {
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
}