import express from 'express';
import { isAdmin, isUser } from '../middlewares/auth.js';
import UserService from '../services/users.service.js';
export const usersRouter = express.Router();

usersRouter.get('/', isUser, isAdmin, async (req, res) => {
    try {
        const users = await UserService.getAll();
        req.logger.debug(users);
        return res.status(200).json({
            status: 'success',
            msg: 'users list',
            data: users,
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

usersRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        return res.status(201).json({
            status: 'success',
            msg: 'user updated',
            data: { _id: id, firstName, lastName, email },
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