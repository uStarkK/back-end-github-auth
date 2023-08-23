import express from 'express';
import { isAdmin, isUser } from '../middlewares/auth.js';
import UserService from '../services/users.service.js';
export const usersRouter = express.Router();

usersRouter.get('/', isUser, isAdmin, async (req, res) => {
    try {
        const users = await UserService.getAll();
        console.log(users);
        return res.status(200).json({
            status: 'success',
            msg: 'users list',
            data: users,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
});

usersRouter.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const userCreated = await UserService.createOne(firstName, lastName, email);
        return res.status(201).json({
            status: 'success',
            msg: 'user created',
            data: userCreated,
        });
    } catch (e) {
        console.log(e);
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
        console.log(e);
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
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
});