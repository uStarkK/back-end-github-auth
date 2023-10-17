import express from 'express';
import { isAdmin, isUser } from '../middlewares/auth.js';
import { getAllUsers } from '../controllers/a_users/getAllUsers.js';
import { deleteInactiveUsers } from '../controllers/a_users/deleteInactiveUsers.js';
import { deleteById } from '../controllers/a_users/deleteById.js';
import { updateUser } from '../controllers/a_users/updateUser.js';
export const usersRouter = express.Router();


usersRouter.get('/', isUser, isAdmin, getAllUsers);


usersRouter.delete("/", isAdmin, deleteInactiveUsers)



usersRouter.delete('/:id', isAdmin, deleteById);

usersRouter.put('/:uid', isAdmin, updateUser);             


