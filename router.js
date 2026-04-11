const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db.js');
const verifytoken = require('./midddleware.js');
const authorizeRole = require('./rolemiddleware.js');

const router = express.Router();

function normalizeRole(role) {
    return String(role || '')
        .trim()
        .toLowerCase();
}

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password required' });
    }
    const query = 'select * from user_data where email=?;';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'server error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'invalid credentials' });
        }
        const user = results[0];
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(401).json({ error: 'invalid password' });
        }
        const role = normalizeRole(user.role);
        const token = jwt.sign(
            { id: user.id, role },
            process.env.secret,
            { expiresIn: '1d' }
        );
        res.json({ token, role });
    });
});

router.post('/register', async (req, res) => {
    let name;
    let email;
    let role;
    let password;
    const b = req.body;
    if (Array.isArray(b)) {
        [name, email, password, role] = b;
    } else {
        name = b.name || b.Name;
        email = b.email;
        role = b.role;
        password = b.password;
    }
    role = normalizeRole(role);
    
    if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ error: 'invalid role' });
    }
    try {
        const hash_password = await bcrypt.hash(password, 10);
        const query =
            'insert into user_data(name,email,role,password) values(?,?,?,?);';
        db.query(query, [name, email, role, hash_password], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'could not register' });
            }
            res.status(201).json({ message: 'user registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
});

router.post('/medicine', verifytoken, authorizeRole(['user', 'admin']), (req, res) => {
    const user_id = req.user.id;
    const { medname, quantity, expiry_date } = req.body;

    const query = 'insert into medicines values (?,?,?,?);';
    db.query(query, [user_id, medname, quantity, expiry_date], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'could not add medicine' });
        }
        res.json({ message: 'medicine added' });
    });
});

router.get('/getmedicine', (req, res) => {
    const sql =
        "SELECT medicine_id, name, quantity, status, expiry_date FROM medicines WHERE status='available' AND expiry_date > CURDATE() ORDER BY name";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'query failed' });
        }
        res.json(result || []);
    });
});

router.get('/search', (req, res) => {
    const medicine = (req.query.medicine || req.query.name || '').trim();
    let sql =
        "SELECT medicine_id, name, quantity, status, expiry_date FROM medicines WHERE status='available' AND expiry_date > CURDATE()";
    const params = [];
    if (medicine) {
        sql += ' AND name LIKE ?';
        params.push(`%${medicine}%`);
    }
    sql += ' ORDER BY name';
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'query failed' });
        }
        res.json(result || []);
    });
});

router.post(
    '/updatestatus',
    verifytoken,
    authorizeRole(['admin']),
    (req, res) => {
        const medicine_id =
            req.body && typeof req.body === 'object'
                ? req.body.medicine_id
                : req.body;
        const query =
            "UPDATE medicines SET status='available' WHERE medicine_id=?";
        db.query(query, [medicine_id], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'update failed' });
            }
            res.json({ message: 'update successful' });
        });
    }
);

router.post(
    '/updateSatus',
    verifytoken,
    authorizeRole(['admin']),
    (req, res) => {
        const medicine_id =
            req.body && typeof req.body === 'object'
                ? req.body.medicine_id
                : req.body;
        const query =
            "UPDATE medicines SET status='available' WHERE medicine_id=?";
        db.query(query, [medicine_id], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'update failed' });
            }
            res.json({ message: 'update successful' });
        });
    }
);

router.post('/requests', verifytoken, authorizeRole(['user', 'admin']), (req, res) => {
    const user_id = req.user.id;
    const medicine_id =
        req.body.medicine_id ?? req.body.medicineId ?? req.body;
    if (medicine_id == null || typeof medicine_id === 'object') {
        return res.status(400).json({ error: 'medicine_id required' });
    }
    const query = 'INSERT INTO requests VALUES (?,?,CURDATE(),?)';
    db.query(query, [medicine_id, user_id, 'pending'], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'could not create request' });
        }
        res.json({ message: 'request submitted' });
    });
});

router.get('/getrequest', verifytoken, authorizeRole(['admin']), (req, res) => {
    const query = 'select m.name,r.quantity,r.adddress from requests r join  medicines m on r.medicine_id=m.medicine_id ;';
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'query failed' });
        }
        res.json(result || []);
    });
});

router.get('/requestuser', verifytoken, authorizeRole(['admin']), (req, res) => {
    const query = 'SELECT * FROM requests ORDER BY 1 DESC';
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'query failed' });
        }
        res.json(result || []);
    });
});

router.get('/users', verifytoken, authorizeRole(['admin']), (req, res) => {
    const query =
        'SELECT id, name, email, role FROM user_data ORDER BY id DESC';
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'query failed' });
        }
        res.json(result || []);
    });
});

router.get('/expiring', verifytoken, authorizeRole(['admin']), (req, res) => {
    const sql = `SELECT medicine_id, name, quantity, status, expiry_date FROM medicines
    WHERE status='available' AND expiry_date > CURDATE()
    AND expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
    ORDER BY expiry_date`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'query failed' });
        }
        res.json(result || []);
    });
});

router.get('/expired', verifytoken, authorizeRole(['admin']), (req, res) => {
    const query = `SELECT medicine_id, name, quantity, status, expiry_date FROM medicines
        WHERE expiry_date <= CURDATE() ORDER BY expiry_date DESC`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'query failed' });
        }
        res.json(result || []);
    });
});

module.exports = router;
