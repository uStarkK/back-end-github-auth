
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { error: 'Session could not be closed' });
        }
        return res.render("logout");
    });
}