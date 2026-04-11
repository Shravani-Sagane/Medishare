const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'access denied' });
        }
        next();
    };
};

module.exports = authorizeRole;
