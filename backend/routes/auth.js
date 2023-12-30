const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'amanshhhh';

//Route 1: Create a user using: POST "/api/auth/createuser". No Login Required.
router.post('/createuser', [
    // Checking for valid values
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of atleast 8 characters').isLength({ min: 8 })],

    async (req, res) => {
        let success = false;
        // If there are errors, return the request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success });
        }

        // Check whether the user with this email exist already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'Sorry, a user with this email already exists.', success });
            }

            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            success = true
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken, success });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server error');
        }
    }
)

//Route 2: Authenticating a user using: POST "/api/auth/login". No Login Required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()],
    async (req, res) => {
        let success = false;
        // If there are errors, return the request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please, try to login with correct credentials", success });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please, try to login with correct credentials", success });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken, success });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server error');
        }
    }
)


// Route 3: Get logged user details. Login required.
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router;