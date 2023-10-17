import UserService from "../../services/UserService.js";




export const updateUser = async (req, res) => {
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
}