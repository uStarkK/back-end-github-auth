import express from 'express';
import passport from 'passport';
import { verifyRecoveryRender } from '../controllers/Render_side_controllers/sessions/verifyRecoveryRender.js';
import { verifyRecovery } from '../controllers/sessions/verifyRecovery.js';
import { isUser } from '../middlewares/auth.js';
import { passwordRecoveryRender } from '../controllers/Render_side_controllers/sessions/passwordRecoveryRender.js';
import { passwordRecovery } from '../controllers/sessions/passwordRecovery.js';
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

sessionsRouter.get('/recover-pass',  passwordRecoveryRender);
sessionsRouter.post('/recover-pass', passwordRecovery);


sessionsRouter.get('/verify-recover', verifyRecoveryRender);
sessionsRouter.post('/verify-recover',  verifyRecovery);