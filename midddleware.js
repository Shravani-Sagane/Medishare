require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifytoken(req, res, next) {
    const raw = req.headers.authorization;
   
    if (!raw) {
        return res.status(401).json({ error: 'no token' });
    }
    const token = raw.startsWith('Bearer') ? raw.slice(7) : raw;
    try {
        const secret = process.env.secret;
        if (!secret) {
            return res.status(500).json({ error: 'server misconfigured' });
        }
        const dec = jwt.verify(token, secret);
        req.user = dec;
        next();
    } catch (err) {
        res.status(401).json({ error: 'invalid token' });
    }
}
module.exports = verifytoken;
