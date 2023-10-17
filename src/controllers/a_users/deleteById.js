import UserService from "../../services/UserService.js";




export const deleteById = async (req, res) => {
    try {
        const uid = req.params.id
        await UserService.deleteOne(uid)
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
}