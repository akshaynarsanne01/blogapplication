const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";
        db.query(query, [username, email, hashedPassword], (err) => {
            if (err) return res.status(400).json({ error: "User registration failed" });
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/', async (req, res) => {
    try {
        const query = "SELECT * FROM Users";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(400).json({ error: "No User Found" });
            }
            // Check if there are results
            if (result.length === 0) {
                return res.status(404).json({ error: "No users available" });
            }
            res.status(200).json({ message: "Users found", data: result });
        });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error !" });
    }
});

// Login User
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM Users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "Invalid credentials" });

        const user = results[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    });
});

module.exports = router;
