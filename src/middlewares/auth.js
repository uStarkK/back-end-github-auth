export function isUser(req, res, next) {
    if (req.session?.user) {
        return next();
    }
    return res.status(401).render('error', { error: 'Unauthorized, please log in' });
}

export function isAdmin(req, res, next) {
    if (req.session?.user.role === "admin") {
        return next();
    }
    return res.status(403).render('error', { error: 'Unauthorized' });
}