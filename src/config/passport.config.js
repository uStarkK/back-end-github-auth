import dotenv from 'dotenv';
import passport from 'passport';
import GitHubStrategy from "passport-github2";
import local from 'passport-local';
import { UserModel } from '../DAO/mongo/models/users.model.js';
import CartService from '../services/CartService.js';
import { createHash, isValidPassword } from '../Utils/utils.js';
import { logger } from '../Utils/logger.js';
dotenv.config();  // Loads environment variables from .env file
const { CLIENT_ID, CLIENT_SECRET } = process.env;
const LocalStrategy = local.Strategy;

export function iniPassport() {
    passport.use(
        'login',
        new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username });
                if (!user) {
                    logger.error('User Not Found with username (email) ' + username);
                    return done(null, false);
                }
                if (!isValidPassword(password, user.password ?? "nopass")) {
                    logger.error('Invalid Password');
                    return done(null, false);
                }
                logger.debug(user.lastConnection)

                await UserModel.findOneAndUpdate(
                    { email: user.email },
                    { $set: { lastConnection: new Date } },
                    { new: true, upsert: true }
                )
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
            },
            async (req, username, password, done) => {
                try {
                    const { email, firstName, lastName, age } = req.body;
                    let user = await UserModel.findOne({ email: username });
                    if (user) {
                        req.logger.info('User already exists');
                        return done(null, false);
                    }

                    const newUser = {
                        email,
                        firstName,
                        lastName,
                        age,
                        role,
                        password: createHash(password),
                        cartId: await CartService.assignCart()
                    };

                    let userCreated = await UserModel.create(newUser);
                    req.logger.debug(userCreated);
                    req.logger.info('User Registration succesful');
                    return done(null, userCreated);
                } catch (e) {
                    req.logger.error('Error in register');
                    req.logger.error(e);
                    return done(e);
                }
            }
        )
    );

    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                callbackURL: 'https://ecommerce-refachero.up.railway.app/api/sessions/githubcallback',
            },
            async (accesToken, _, profile, done) => {
                logger.debug(profile)
                try {
                    const res = await fetch('https://api.github.com/user/emails', {
                        headers: {
                            Accept: 'application/vnd.github+json',
                            Authorization: 'Bearer ' + accesToken,
                            'X-Github-Api-Version': '2022-11-28',
                        },
                    });

                    const emails = await res.json();
                    const emailDetail = emails.find((email) => email.verified == true);

                    if (!emailDetail) {
                        return done(new Error('cannot get a valid email for this user'));
                    }
                    profile.email = emailDetail.email;

                    let user = await UserModel.findOne({ email: profile.email });
                    if (!user) {
                        const newUser = {
                            email: profile.email,
                            firstName: profile._json.name || profile._json.login || 'noname',
                            lastName: "nolast",
                            age: null,
                            isAdmin: false,
                            password: "$%/$)#lJGITKsj(!_$:%HUB_:;mf/#)¨*",
                            cartId: await CartService.assignCart()
                        };
                        let userCreated = await UserModel.create(newUser);


                        // Finds the user document in the database and sets password to null
                        try {

                            const user = await UserModel.findOneAndUpdate(
                                { email: newUser.email },
                                { $set: { password: null, lastName: null } },
                                { new: true, upsert: true }
                            );

                        } catch (err) {
                            // Handle the error
                            logger.error(err);
                        }
                        logger.info('User Registration succesful');
                        return done(null, userCreated);
                    } else {
                        logger.info('User already exists');
                        await UserModel.findOneAndUpdate(
                            { email: user.email },
                            { $set: { lastConnection: new Date } },
                            { new: true, upsert: true }
                        )
                        return done(null, user);
                    }
                } catch (e) {
                    logger.error('Error en auth github');
                    logger.error(e);
                    return done(e);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id);
        done(null, user);
    });
}