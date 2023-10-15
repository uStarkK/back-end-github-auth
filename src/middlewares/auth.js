import { logger } from "../Utils/logger.js";

export function isUser(req, res, next) {
    try {
        if (req.session?.user) {
            return next();
        }
    } catch (e) {
        logger.error(e.message);
        const isLogin = "Must be logged-in to access this page";
        return res.status(201).render("error", { isLogin });
    }
}

    export function isPremium(req, res, next) {
        try {
            if (req.session?.user?.role == "admin" || req.session?.user?.premium == true) {
                return next();
            } else {
                const isAdmin = "Must be an admin or premium user to access this page";
                return res.status(201).render("error", {error: isAdmin});
            }
        } catch (e) {
            logger.error(e.message);
        }
    }

    export function isAdmin(req, res, next) {
        try {
            if (req.session?.user?.role == "admin"){
                return next();
            } else {
                const isAdmin = "Unauthorized. You lack permissions to view this page";
                return res.status(201).render("error", {error: isAdmin});
            }
        } catch (e) {
            logger.error(e.message);
        }
    }