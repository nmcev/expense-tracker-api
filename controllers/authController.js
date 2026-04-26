const bcryptjs = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

require('dotenv').config();

module.exports = {

    register: [
        body('username').isLength({ min: 3 }).trim().withMessage('Username must be at least 3 characters!'),
        body('password').isLength({ min: 5 }).trim().withMessage('Password must be at least 5 characters!'),

        async function (req, res, next) {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            let { username, password } = req.body;

            username = username.toLowerCase();

            try {
                const existingUser = await User.findOne({ username });

                if (existingUser) {
                    return res.status(400).json({ message: "Username already taken!" })
                }

                const hashedPassword = await bcryptjs.hash(password, 10);


                const newUser = new User({
                    username,
                    password: hashedPassword,
                });

                await newUser.save();


                res.json({ message: "User Created!" })

            } catch (e) {
                next(e);
            }

        }
    ],

    login: [
        body('username').isLength({ min: 3 }).trim().withMessage('Username must be at least 3 characters!'),
        body('password').isLength({ min: 5 }).trim().withMessage('Password must be at least 5 characters!'),

        async function (req, res, next) {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            let { username, password } = req.body;

            username = username.toLowerCase();


            try {
                const user = await User.findOne({ username });

                if (!user) {
                    return res.status(400).json({ message: "Invalid Credentials!" });
                }

                const passwordMatch = await bcryptjs.compare(password, user.password);

                if (!passwordMatch) {
                    return res.status(400).json({ message: "Invalid Credentials!" });
                }

                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );


                res.json({
                    token,
                    user: {
                        id: user._id,
                        username: user.username
                    }
                })

            } catch (e) {
                next(e);
            }


        }
    ]

}

