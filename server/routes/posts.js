const express = require("express");
const db = require("../db");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Create Post
router.post("/", authenticateToken, (req, res) => {
    const { title, content } = req.body;
    const query = "INSERT INTO Posts (user_id, title, content) VALUES (?, ?, ?)";
    db.query(query, [req.user.id, title, content], (err) => {
        if (err) return res.status(400).json({ error: "Failed to create post" });
        res.status(201).json({ message: "Post created successfully" });
    });
});

// Get All Posts
router.get("/", (req, res) => {
    const query = `
        SELECT Posts.id, Posts.title, Posts.content, Posts.created_at, Users.username
        FROM Posts
        JOIN Users ON Posts.user_id = Users.id
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch posts" });
        res.json(results);
    });
});

// Get Posts by User
router.get("/:postId", (req, res) => {
    const { postId } = req.params;
    const query = "SELECT * FROM Posts WHERE id = ?";
    db.query(query, [postId], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch posts" });
        res.json(results);
    });
});

// Delete Post
router.delete("/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Posts WHERE id = ? AND user_id = ?";
    db.query(query, [id, req.user.id], (err, result) => {
        if (err || result.affectedRows === 0) return res.status(400).json({ error: "Failed to delete post" });
        res.json({ message: "Post deleted successfully" });
    });
});

module.exports = router;
