export function isUser(req, res, next) {
    if (req.session?.email) {
        return next();
    }
    return res.status(401).render('error', { error: 'error de autenticacion!' });
}

export function isAdmin(req, res, next) {
    if (req.session?.role === "admin") {
        return next();
    }
    return res.status(403).render('error', { error: 'error de autorización!' });
}