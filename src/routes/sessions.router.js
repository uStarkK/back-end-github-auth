import express from 'express';
import passport from 'passport';
export const sessionsRouter = express.Router();

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    
    req.session.user = req.user;
    // Successful authentication, redirect home.
    res.redirect('/auth/profile');
});

sessionsRouter.get('/current', (req, res) => {
    return res.send(JSON.stringify(req.session));
});