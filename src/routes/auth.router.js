import express from 'express';
import passport from 'passport';
import { isAdmin, isUser } from '../middlewares/auth.js';

export const authRouter = express.Router();

authRouter.get('/session', (req, res) => {
    return res.send(JSON.stringify(req.session));
});

authRouter.get('/register', (req, res) => {
    if (req.user) {                           //If user is ALREADY logged in, redirects to profile
        return res.redirect("/auth/profile")
    }
    return res.render('register', {});
});

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {
    if (!req.user) {
        return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role, cartId: req.user.cartId };
    return res.redirect("/auth/login");
});

authRouter.get('/failregister', async (req, res) => {
    return res.json({ error: 'fail to register' });
});

authRouter.get('/login', (req, res) => {
    if (req.user) {                                  //If user is ALREADY logged in, redirects to profile
        return res.redirect("/auth/profile")
    }
    return res.render('login', {});
});

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role, cartId: req.user.cartId };
    console.log(req.session.user, "******************************************************************")
    return res.redirect("/auth/profile");
});

authRouter.get('/faillogin', async (req, res) => {
    console.log("Failed to login, invalid credentials")
    return res.redirect("/auth/login")
});

authRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { error: 'Session could not be closed' });
        }
        return res.render("logout");
    });
});

authRouter.get('/profile', (req, res) => {
    if (!req.user) {                           //If user is NOT logged in, redirects to login page
        return res.redirect("/auth/login")
    }
    const user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role, cartId: req.user.cartId };
    req.session.user = user
    return res.render('profile', { user: user });

});
