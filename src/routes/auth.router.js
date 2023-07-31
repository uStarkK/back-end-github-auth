import express from 'express';
import passport from 'passport';
import { isAdmin, isUser } from '../middlewares/auth.js';
import { failRegister, register, registerRedirect } from '../controllers/auth/register.js';
import { failLogin, login, loginRedirect } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';
import { profile } from '../controllers/auth/profile.js';

export const authRouter = express.Router();

authRouter.get('/session', (req, res) => {
    return res.send(JSON.stringify(req.session));
});

authRouter.get('/register', registerRedirect);

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), register);

authRouter.get('/failregister', failRegister);

authRouter.get('/login', loginRedirect);

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), login);

authRouter.get('/faillogin', failLogin);

authRouter.get('/logout', logout);

authRouter.get('/profile', profile);
